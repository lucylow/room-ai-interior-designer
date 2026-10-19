import type { CheckoutRequest, CommerceCart, CheckoutSession } from '../../src/types/commerce';
import { validateCheckoutRequest } from '../../src/security/checkout-safety';
import { CheckoutOrchestrator } from '../../src/checkout/checkout-orchestrator';

export class ServerCheckoutService {
  constructor(private readonly orchestrator: CheckoutOrchestrator, private readonly allowedOrigins: string[]) {}

  async create(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession> {
    validateCheckoutRequest(req, cart, this.allowedOrigins);
    return this.orchestrator.start(req, cart);
  }

  /** Reuse the caller's key: provider failures were not cached, successful sessions remain idempotent. */
  async retry(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession> {
    return this.create(req, cart);
  }
}
