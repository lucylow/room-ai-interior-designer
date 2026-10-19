import { CartStore } from '../cart/cart-store';
import { CheckoutOrchestrator } from '../checkout/checkout-orchestrator';
import { DemoCheckoutProvider } from '../providers/demo-provider';
import { StripeCheckoutProvider } from '../providers/stripe-provider';
import { ShopifyCheckoutProvider } from '../providers/shopify-provider';
import { AffiliateCheckoutProvider } from '../providers/affiliate-provider';
import type { RetailCheckoutProvider } from '../providers/provider';
import { applyPricing, discountFromPercent } from '../pricing/price-engine';
import { quoteShipping } from '../shipping/shipping-engine';
import { quoteTax } from '../tax/tax-engine';
import { demoCatalog } from '../demo/catalog-v6';
import { MonetizationBus } from '../monetization/event-bus';
import { validateCheckoutRequest } from '../security/checkout-safety';
import type { CartLine, CheckoutRequest, CommerceCart } from '../types/commerce';

export interface CommerceConfig { stripeSecretKey?: string; shopDomain?: string; shopifyStorefrontToken?: string; }
export type CommerceProvenance = Partial<Pick<CartLine, 'projectId' | 'roomId' | 'conceptId' | 'placementId'>>;

/** Server-owned application façade. Never instantiate with live secrets in a client bundle. */
export class CommerceApp {
  readonly carts = new CartStore();
  readonly events = new MonetizationBus();
  readonly checkout: CheckoutOrchestrator;

  constructor(config: CommerceConfig = {}) {
    const providers = new Map<string, RetailCheckoutProvider>();
    providers.set('demo', new DemoCheckoutProvider());
    if (config.stripeSecretKey) providers.set('stripe', new StripeCheckoutProvider({ secretKey: config.stripeSecretKey }));
    if (config.shopDomain && config.shopifyStorefrontToken) {
      providers.set('shopify', new ShopifyCheckoutProvider({ shopDomain: config.shopDomain, storefrontAccessToken: config.shopifyStorefrontToken }));
    }
    providers.set('affiliate', new AffiliateCheckoutProvider((productId, variantId, subId) =>
      `https://retailer.example/buy?product=${encodeURIComponent(productId)}&variant=${encodeURIComponent(variantId)}&sub=${encodeURIComponent(subId)}`));
    this.checkout = new CheckoutOrchestrator(providers);
  }

  createDemoCart(userId = 'demo-user', budget = 1500) {
    return this.carts.create(userId, 'CAD', { amount: budget, currency: 'CAD' });
  }

  addDemoProduct(cart: CommerceCart, index: number, quantity = 1, provenance: CommerceProvenance = {}) {
    const product = demoCatalog[index % demoCatalog.length];
    const variant = product.variants[0];
    if (!variant) throw new Error('demo_variant_missing');
    const next = this.carts.add(cart.id, product, variant.id, quantity, {
      source: 'ai_concept', commissionEligible: true, affiliateRate: 0.08, ...provenance,
    });
    this.events.emit({
      type: 'add_to_cart', userId: cart.userId, projectId: next.projectId,
      cartId: cart.id, productId: product.id,
      metadata: { source: 'demo', conceptId: provenance.conceptId ?? '', roomId: provenance.roomId ?? '' },
    });
    return next;
  }

  reprice(cart: CommerceCart, address?: import('../types/commerce').Address) {
    const shipping = quoteShipping(cart, 'ship');
    const tax = quoteTax(cart, address);
    const discount = discountFromPercent('ROOMSET15', 0.15, cart);
    return applyPricing(cart, discount, shipping, tax);
  }

  async startCheckout(req: CheckoutRequest, cart: CommerceCart) {
    validateCheckoutRequest(req, cart, ['https://app.reroom.ai', 'http://localhost:3000']);
    this.events.emit({ type: 'checkout_started', userId: cart.userId, projectId: cart.projectId, cartId: cart.id, value: cart.totals.total, metadata: { provider: req.provider } });
    return this.checkout.start(req, cart);
  }
}
