import { domainStores } from './app-registry';
import { getSafeBrowserStorage } from '../security/storage';
import { decodeVersioned, type VersionedRecord } from './persistence/codec';
import { persistDomain } from './persistence/persist-domain';
import { migrate, roomMigrations } from './persistence/migrations';
import type { RoomDomainState } from './domains/room-store';
import type { ExternalStore } from './store';
import { privacyStore, syncConsentRegistry } from './domains/privacy-store';
import type { RoomObjectState, RoomStateModel } from '../security/types';
import type { PersistConfig } from './persistence/persist-domain';

type PersistableStore = ExternalStore<unknown>;
type DomainName = 'privacy' | 'room' | 'design' | 'ar' | 'shopping' | 'construction' | 'sync';

const persistable = [
  ['privacy', domainStores.privacy],
  ['room', domainStores.room],
  ['design', domainStores.design],
  ['ar', domainStores.ar],
  ['shopping', domainStores.shopping],
  ['construction', domainStores.construction],
  ['sync', domainStores.sync],
] as const;

const consentScopes = ['local-storage', 'cloud-storage', 'ai-processing', 'ai-memory', 'analytics', 'commerce', 'construction-sharing', 'diagnostics'];
const roomObjectTypes = ['sofa', 'table', 'rug', 'lamp', 'cabinet', 'bed', 'chair', 'plant', 'custom'];
const roomTypes = ['living-room', 'bedroom', 'kitchen', 'office', 'dining-room', 'bathroom', 'other'];
const sensitivities = ['public', 'internal', 'personal', 'sensitive', 'restricted'];
const validSources = ['onboarding', 'settings', 'feature-prompt', 'system-default'];
const validStatuses = ['draft', 'generating', 'ready', 'failed'];
const validProjects = ['draft', 'shared', 'complete'];
const validMutationStatuses = ['queued', 'sending', 'acked', 'failed'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function boundedString(value: unknown, max = 512): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max;
}

function finite(value: unknown, min = -1_000_000, max = 1_000_000): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

function validRetention(value: unknown): boolean {
  return isRecord(value) && ['roomDays', 'generatedAssetDays', 'telemetryDays'].every(key => finite(value[key], 0, 3650));
}

function validRoomObject(value: unknown): value is RoomObjectState {
  if (!isRecord(value)) return false;
  return boundedString(value.id, 256) && roomObjectTypes.includes(String(value.type)) && boundedString(value.label) &&
    finite(value.x) && finite(value.y) && finite(value.z) && finite(value.rotationY, -Math.PI * 100, Math.PI * 100) &&
    finite(value.width, 0.01, 25) && finite(value.height, 0.01, 25) && finite(value.depth, 0.01, 25) && typeof value.locked === 'boolean';
}

function validRoom(value: unknown, allowOldVersion: boolean): value is RoomStateModel {
  if (!isRecord(value) || !boundedString(value.id, 256) || !boundedString(value.name) || !roomTypes.includes(String(value.roomType)) ||
      !Array.isArray(value.objects) || value.objects.length > 250 || !value.objects.every(validRoomObject) || !isRecord(value.measurements) ||
      !finite(value.updatedAt, 0, Number.MAX_SAFE_INTEGER) || (!allowOldVersion && !finite(value.version, 1, Number.MAX_SAFE_INTEGER)) ||
      (value.version !== undefined && !finite(value.version, 1, Number.MAX_SAFE_INTEGER)) ||
      (!allowOldVersion && !sensitivities.includes(String(value.sensitivity))) ||
      (value.sensitivity !== undefined && !sensitivities.includes(String(value.sensitivity)))) return false;
  for (const key of ['widthM', 'depthM', 'ceilingM']) {
    const dimension = value.measurements[key];
    if (dimension !== undefined && !finite(dimension, 0.1, 100)) return false;
  }
  for (const key of ['imageAssetId', 'layoutAssetId']) {
    const assetId = value[key];
    if (assetId !== undefined && !boundedString(assetId, 2048)) return false;
  }
  return true;
}

function validPersistedDomain(name: DomainName, value: unknown, schema: number): boolean {
  if (!isRecord(value)) return false;
  switch (name) {
    case 'privacy':
      return Array.isArray(value.consent) && value.consent.length <= consentScopes.length && value.consent.every(item => isRecord(item) &&
        consentScopes.includes(String(item.scope)) && typeof item.granted === 'boolean' && finite(item.updatedAt, 0, Number.MAX_SAFE_INTEGER) &&
        validSources.includes(String(item.source)) && finite(item.version, 1, 100)) &&
        isRecord(value.vault) && typeof value.vault.enabled === 'boolean' && typeof value.vault.unlocked === 'boolean' &&
        ['native-keychain', 'web-encrypted', 'memory'].includes(String(value.vault.backend)) &&
        validRetention(value.retention) &&
        isRecord(value.dataExports) && ['idle', 'requested', 'ready', 'failed'].includes(String(value.dataExports.status)) &&
        (value.dataExports.lastRequestedAt === undefined || finite(value.dataExports.lastRequestedAt, 0, Number.MAX_SAFE_INTEGER));
    case 'room': {
      if (!isRecord(value.rooms) || Object.keys(value.rooms).length > 100 || !Array.isArray(value.history) || value.history.length > 50 ||
          !value.history.every(item => boundedString(item, 256)) || (value.activeRoomId !== undefined && !boundedString(value.activeRoomId, 256))) return false;
      return Object.entries(value.rooms).every(([id, room]) => boundedString(id, 256) && validRoom(room, schema < 3) && room.id === id);
    }
    case 'design':
      return isRecord(value.designs) && Object.keys(value.designs).length <= 500 && Object.values(value.designs).every(item => isRecord(item) &&
        boundedString(item.id, 256) && boundedString(item.roomId, 256) && boundedString(item.style, 256) && typeof item.prompt === 'string' && item.prompt.length <= 4000 &&
        finite(item.createdAt, 0, Number.MAX_SAFE_INTEGER) && validStatuses.includes(String(item.status)) && Array.isArray(item.generatedAssetIds) &&
        item.generatedAssetIds.length <= 500 && item.generatedAssetIds.every(asset => boundedString(asset, 2048)) && typeof item.approved === 'boolean' && finite(item.version, 1, Number.MAX_SAFE_INTEGER)) &&
        (value.activeDesignId === undefined || boundedString(value.activeDesignId, 256));
    case 'ar':
      return typeof value.supported === 'boolean' && ['idle', 'tracking', 'placing', 'measuring', 'error'].includes(String(value.mode)) &&
        Array.isArray(value.anchorIds) && value.anchorIds.length <= 500 && value.anchorIds.every(item => boundedString(item, 256)) &&
        (value.selectedObjectId === undefined || boundedString(value.selectedObjectId, 256)) &&
        (value.lastCalibrationAt === undefined || finite(value.lastCalibrationAt, 0, Number.MAX_SAFE_INTEGER));
    case 'shopping':
      return Array.isArray(value.wishlist) && value.wishlist.length <= 100 && value.wishlist.every(item => isRecord(item) && boundedString(item.productId, 256) &&
        boundedString(item.title) && finite(item.price, 0, 1_000_000_000) && typeof item.currency === 'string' && /^[A-Z]{3}$/.test(item.currency) && finite(item.savedAt, 0, Number.MAX_SAFE_INTEGER)) &&
        Array.isArray(value.comparisons) && value.comparisons.length <= 100 && value.comparisons.every(item => boundedString(item, 256)) &&
        (value.lastViewedProductId === undefined || boundedString(value.lastViewedProductId, 256));
    case 'construction':
      return isRecord(value.projects) && Object.keys(value.projects).length <= 100 && Object.entries(value.projects).every(([id, item]) => isRecord(item) &&
        boundedString(item.id, 256) && item.id === id && boundedString(item.roomId, 256) && boundedString(item.title) && Array.isArray(item.scope) &&
        item.scope.length <= 500 && item.scope.every(scope => boundedString(scope, 1000)) && finite(item.estimateCents, 0, 1_000_000_000_000) && validProjects.includes(String(item.status))) &&
        (value.activeProjectId === undefined || boundedString(value.activeProjectId, 256));
    case 'sync':
      return Array.isArray(value.queue) && value.queue.length <= 1000 && value.queue.every(item => isRecord(item) && boundedString(item.idempotencyKey, 256) &&
        boundedString(item.mutationId, 256) && boundedString(item.entity, 256) && boundedString(item.entityId, 256) && finite(item.version, 1, Number.MAX_SAFE_INTEGER) &&
        finite(item.createdAt, 0, Number.MAX_SAFE_INTEGER) && finite(item.attempts, 0, 8) && validMutationStatuses.includes(String(item.status)) &&
        (item.lastError === undefined || typeof item.lastError === 'string' && item.lastError.length <= 500)) && typeof value.online === 'boolean' &&
        (value.lastSyncAt === undefined || finite(value.lastSyncAt, 0, Number.MAX_SAFE_INTEGER));
  }
}

let initialized = false;
let storageWarningShown = false;
let privacyConsentTrusted = true;

function localStorageConsentGranted(): boolean {
  return privacyConsentTrusted && privacyStore.getSnapshot().consent.some(item => item.scope === 'local-storage' && item.granted);
}

function reportStorageFailure(): void {
  if (storageWarningShown) return;
  console.warn('[RE:ROOM] Local app state could not be read or saved; affected stored data was left untouched.');
  storageWarningShown = true;
}

/** Hydrate versioned app domains once; authentication/session state is deliberately memory-only. */
export function initializeDomainPersistence(): void {
  if (initialized) return;
  initialized = true;
  const storage = getSafeBrowserStorage();

  for (const [name, rawStore] of persistable) {
    const domain = name as DomainName;
    if (domain !== 'privacy' && !localStorageConsentGranted()) continue;
    const store = rawStore as PersistableStore;
    const key = `rerroom:domain:${name}`;
    const schema = name === 'room' ? 3 : 1;
    const config: PersistConfig<unknown> = {
      key,
      schema,
      storage,
      select: () => store.getSnapshot(),
      hydrate: value => store.setState(() => value),
    };

    let compatible = true;
    let raw: string | null = null;
    let record: VersionedRecord<unknown> | undefined;
    try {
      raw = storage.getItem(key);
      if (raw) {
        record = decodeVersioned<unknown>(raw);
        compatible = domain === 'room' ? record.schema >= 1 && record.schema <= 3 : record.schema === schema;
        if (compatible && !validPersistedDomain(domain, record.value, record.schema)) compatible = false;
      }
    } catch {
      compatible = false;
      if (domain === 'privacy') privacyConsentTrusted = false;
      reportStorageFailure();
    }

    if (domain === 'privacy' && raw && !compatible) privacyConsentTrusted = false;

    if (compatible && record && domain === 'room') {
      try {
        const roomState = record.schema < 3
          ? migrate(record.value as RoomDomainState, record.schema, 3, roomMigrations)
          : record.value as RoomDomainState;
        if (!validPersistedDomain('room', roomState, 3)) throw new Error('Invalid room state.');
        store.setState(() => roomState);
        persistDomain(config);
      } catch {
        compatible = false;
        reportStorageFailure();
      }
    } else if (compatible && record) {
      store.setState(() => record!.value);
    } else if (!compatible && raw) {
      // Do not delete or later overwrite corrupt or unsupported stored state.
      reportStorageFailure();
    }

    if (compatible) store.subscribe(() => {
      if (domain === 'privacy' || localStorageConsentGranted()) persistDomain(config);
    });
  }

  try {
    syncConsentRegistry();
  } catch {
    reportStorageFailure();
  }
}
