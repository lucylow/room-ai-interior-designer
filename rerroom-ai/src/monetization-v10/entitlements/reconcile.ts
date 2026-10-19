import type { EntitlementGrant, MonetizationFeature } from '../types';

const FEATURES = new Set<MonetizationFeature>([
  'ai_generation',
  'advanced_ai',
  'hd_render',
  'gaussian_splats',
  'cad_bim_tools',
  'project_exports',
  'team_projects',
  'priority_support',
  'unlimited_projects',
  'commercial_use',
  'design_templates',
  'retail_shopping',
]);

const STATES = new Set<EntitlementGrant['state']>([
  'active',
  'grace',
  'retry',
  'expired',
  'revoked',
]);

const CLIENT_SOURCES = new Set<EntitlementGrant['source']>(['apple', 'demo']);
const STATE_RANK: Record<EntitlementGrant['state'], number> = {
  revoked: 0,
  expired: 1,
  retry: 2,
  grace: 3,
  active: 4,
};

export class EntitlementReconciliationError extends Error {
  constructor(readonly code: 'invalid_input' | 'invalid_grant' | 'invalid_clock') {
    super(code);
    this.name = 'EntitlementReconciliationError';
  }
}

/** Server grants always override client claims, including when the server revokes access. */
export function reconcileEntitlements(
  client: EntitlementGrant[],
  server: EntitlementGrant[],
  now = Date.now(),
): EntitlementGrant[] {
  if (!Array.isArray(client) || !Array.isArray(server)) {
    throw new EntitlementReconciliationError('invalid_input');
  }
  if (!Number.isFinite(now)) throw new EntitlementReconciliationError('invalid_clock');

  const clientByFeature = new Map<MonetizationFeature, EntitlementGrant>();
  for (const grant of client) {
    const normalized = normalizeGrant(grant, 'client', now);
    const previous = clientByFeature.get(normalized.feature);
    // Conflicting local claims resolve to the least permissive state.
    if (!previous || STATE_RANK[normalized.state] <= STATE_RANK[previous.state]) {
      clientByFeature.set(normalized.feature, normalized);
    }
  }

  const serverByFeature = new Map<MonetizationFeature, EntitlementGrant>();
  for (const grant of server) {
    // For duplicate server entries, the last canonical server record wins.
    const normalized = normalizeGrant(grant, 'server', now);
    serverByFeature.set(normalized.feature, normalized);
  }

  const merged = new Map(clientByFeature);
  for (const [feature, grant] of serverByFeature) merged.set(feature, grant);
  return [...merged.values()]
    .sort((a, b) => a.feature.localeCompare(b.feature))
    .map((grant) => ({ ...grant }));
}

function normalizeGrant(
  value: EntitlementGrant,
  origin: 'client' | 'server',
  now: number,
): EntitlementGrant {
  if (!value || typeof value !== 'object') {
    throw new EntitlementReconciliationError('invalid_grant');
  }
  if (!FEATURES.has(value.feature) || !STATES.has(value.state)) {
    throw new EntitlementReconciliationError('invalid_grant');
  }
  if (typeof value.productId !== 'string' || value.productId.trim().length === 0) {
    throw new EntitlementReconciliationError('invalid_grant');
  }
  if (origin === 'server' && value.source !== 'server') {
    throw new EntitlementReconciliationError('invalid_grant');
  }
  if (origin === 'client' && !CLIENT_SOURCES.has(value.source)) {
    throw new EntitlementReconciliationError('invalid_grant');
  }

  let state = value.state;
  if (value.expiresAt !== undefined) {
    if (typeof value.expiresAt !== 'string') throw new EntitlementReconciliationError('invalid_grant');
    const expiry = Date.parse(value.expiresAt);
    if (!Number.isFinite(expiry)) throw new EntitlementReconciliationError('invalid_grant');
    if (expiry <= now && (state === 'active' || state === 'grace' || state === 'retry')) {
      state = 'expired';
    }
  }

  return {
    ...value,
    productId: value.productId.trim(),
    state,
  };
}
