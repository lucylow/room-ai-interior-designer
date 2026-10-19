import { OrderStore } from '../../src/orders/order-store';
import { WebhookStore } from '../../src/webhooks/event-store';
import type { CommerceCart, Provider } from '../../src/types/commerce';

const paymentEvents: Record<Provider, string[]> = {
  stripe: ['checkout.session.completed', 'payment_intent.succeeded'],
  shopify: ['orders/paid'],
  demo: ['payment_succeeded', 'demo.payment_succeeded'],
  affiliate: [],
};

export class ServerOrderService {
  constructor(private readonly orders = new OrderStore(), private readonly webhooks = new WebhookStore()) {}

  create(cart: CommerceCart, intentId: string, provider: Provider, email?: string) {
    const order = this.orders.create(cart, intentId, provider, email);
    return this.orders.setStatus(order.id, 'pending_payment');
  }

  markPaid(orderId: string, webhookEventId: string) {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('order_not_found');
    const event = this.webhooks.get(webhookEventId);
    if (!event?.verified) throw new Error('verified_webhook_required');
    if (event.provider !== order.provider) throw new Error('webhook_provider_mismatch');
    if (!paymentEvents[event.provider].includes(event.eventType)) throw new Error('webhook_not_payment_confirmation');
    return this.orders.setStatus(orderId, 'paid');
  }

  markProcessing(orderId: string) { return this.orders.setStatus(orderId, 'processing'); }
  markShipped(orderId: string) { return this.orders.setStatus(orderId, 'shipped'); }
  markComplete(orderId: string) { return this.orders.setStatus(orderId, 'completed'); }
}
