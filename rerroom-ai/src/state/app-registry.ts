import { authStore } from './domains/auth-store';
import { roomStore } from './domains/room-store';
import { designStore } from './domains/design-store';
import { arStore } from './domains/ar-store';
import { shoppingStore } from './domains/shopping-store';
import { constructionStore } from './domains/construction-store';
import { privacyStore } from './domains/privacy-store';
import { syncStore } from './domains/sync-store';

export const domainStores = {
  auth: authStore,
  room: roomStore,
  design: designStore,
  ar: arStore,
  shopping: shoppingStore,
  construction: constructionStore,
  privacy: privacyStore,
  sync: syncStore,
} as const;

export function snapshotDomains(): Record<string, unknown> {
  return Object.fromEntries(Object.entries(domainStores).map(([name, store]) => [name, store.getSnapshot()]));
}
