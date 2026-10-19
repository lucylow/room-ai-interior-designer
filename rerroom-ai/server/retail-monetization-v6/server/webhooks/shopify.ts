import { WebhookStore } from '../../src/webhooks/event-store';
import { verifyShopifyWebhookSignature } from './signature-verification';

export interface ShopifyWebhookConfig { secret: string; }

export function acceptShopifyWebhook(
  store: WebhookStore, config: ShopifyWebhookConfig, rawBody: string,
  hmacHeader: string, eventId: string, eventType: string, payload: unknown,
): boolean {
  if (!verifyShopifyWebhookSignature(config.secret, rawBody, hmacHeader)) {
    throw new Error('shopify_webhook_verification_failed');
  }
  return store.put({ id: eventId, provider: 'shopify', eventType, payload, receivedAt: new Date().toISOString(), verified: true });
}
