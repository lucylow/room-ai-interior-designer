export type AppStoreNotificationType =
  | 'SUBSCRIBED'
  | 'DID_RENEW'
  | 'DID_FAIL_TO_RENEW'
  | 'EXPIRED'
  | 'GRACE_PERIOD_EXPIRED'
  | 'REFUND'
  | 'REVOKE'
  | 'OFFER_REDEEMED';

export interface AppStoreNotification {
  id: string;
  type: AppStoreNotificationType;
  signedPayload: string;
  receivedAt: string;
}

const NOTIFICATION_TYPES = new Set<AppStoreNotificationType>([
  'SUBSCRIBED',
  'DID_RENEW',
  'DID_FAIL_TO_RENEW',
  'EXPIRED',
  'GRACE_PERIOD_EXPIRED',
  'REFUND',
  'REVOKE',
  'OFFER_REDEEMED',
]);

/**
 * Claim a notification only after an upstream JWS verifier returns true.
 * This helper does not cryptographically verify signedPayload itself.
 */
export function dedupeNotification(
  existing: Set<string>,
  notification: AppStoreNotification,
  signatureVerified: boolean,
): boolean {
  if (!signatureVerified || !(existing instanceof Set) || !isValidNotification(notification)) {
    return false;
  }

  const id = notification.id.trim();
  if (existing.has(id)) return false;
  existing.add(id);
  return true;
}

function isValidNotification(value: AppStoreNotification): boolean {
  if (!value || typeof value !== 'object') return false;
  if (typeof value.id !== 'string' || value.id.trim().length === 0 || value.id.length > 256) return false;
  if (!NOTIFICATION_TYPES.has(value.type)) return false;
  if (typeof value.signedPayload !== 'string' || value.signedPayload.trim().length === 0) return false;
  if (typeof value.receivedAt !== 'string' || !Number.isFinite(Date.parse(value.receivedAt))) return false;
  return true;
}
