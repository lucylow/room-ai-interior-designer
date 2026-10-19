import { WebhookStore } from '../../src/webhooks/event-store';
import { demoSignature } from '../../src/webhooks/verify';
import { verifyStripeWebhookSignature } from './signature-verification';

export interface StripeWebhookConfig { secret: string; toleranceSeconds?: number; nowSeconds?: number; }

export function acceptStripeWebhook(
  store: WebhookStore, config: StripeWebhookConfig, raw: string, signature: string,
  eventId: string, eventType: string, payload: unknown,
): boolean {
  if (!verifyStripeWebhookSignature(config.secret, raw, signature, config.nowSeconds, config.toleranceSeconds)) {
    throw new Error('stripe_webhook_verification_failed');
  }
  return store.put({ id: eventId, provider: 'stripe', eventType, payload, receivedAt: new Date().toISOString(), verified: true });
}

/** Fixture helper only. acceptStripeWebhook intentionally does not accept this demo signature. */
export function signDemoStripe(config: StripeWebhookConfig, raw: string): string {
  return demoSignature(config.secret, raw);
}
