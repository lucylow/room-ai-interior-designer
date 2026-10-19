import { deterministicId } from '../core/id';
import { validateCart } from '../cart/cart-validator';
import type { CommerceCart, CheckoutRequest, CheckoutSession } from '../types/commerce';
import type { RetailCheckoutProvider } from '../providers/provider';

interface SessionRecord { session: CheckoutSession; cartVersion: number; }
interface InFlightRecord { promise: Promise<CheckoutSession>; cartVersion: number; }

export class CheckoutOrchestrator {
  private readonly sessions = new Map<string, SessionRecord>();
  private readonly inFlight = new Map<string, InFlightRecord>();

  constructor(private readonly providers: Map<string, RetailCheckoutProvider>) {}

  async start(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession> {
    if (req.cartId !== cart.id) throw new Error('checkout_cart_mismatch');
    const issues = validateCart(cart);
    if (issues.some((issue) => issue.severity === 'error')) {
      throw new Error(issues.filter((issue) => issue.severity === 'error').map((issue) => issue.code).join(','));
    }
    const key = deterministicId('checkout', `${req.provider}:${cart.id}:${req.idempotencyKey}`);
    const cartVersion = cart.version;
    const cached = this.sessions.get(key);
    if (cached) {
      if (cached.cartVersion !== cartVersion) throw new Error('checkout_cart_changed');
      if (cached.session.status === 'open' && Date.parse(cached.session.expiresAt) <= Date.now()) {
        this.sessions.delete(key);
        throw new Error('checkout_session_expired');
      }
      return this.copySession(cached.session);
    }
    const pending = this.inFlight.get(key);
    if (pending) {
      if (pending.cartVersion !== cartVersion) throw new Error('checkout_cart_changed');
      return pending.promise.then((session) => this.copySession(session));
    }
    const provider = this.providers.get(req.provider);
    if (!provider) throw new Error('provider_not_configured');
    const snapshot = structuredClone(cart);

    const operation = Promise.resolve().then(async () => {
      const session = await provider.createSession({ ...req, idempotencyKey: key }, snapshot);
      try {
        this.validateSession(session, req, snapshot);
      } catch (error) {
        if (session?.id) {
          try { await provider.cancelSession(session.id); }
          catch { throw new Error('checkout_provider_response_cleanup_failed'); }
        }
        throw error;
      }
      if (cart.version !== cartVersion) {
        try { await provider.cancelSession(session.id); }
        catch { throw new Error('checkout_cart_changed_cleanup_failed'); }
        throw new Error('checkout_cart_changed');
      }
      this.sessions.set(key, { session: this.copySession(session), cartVersion });
      return this.copySession(session);
    });
    const record = { promise: operation, cartVersion };
    this.inFlight.set(key, record);
    try {
      return await operation;
    } finally {
      if (this.inFlight.get(key) === record) this.inFlight.delete(key);
    }
  }

  getById(id: string): CheckoutSession | null {
    const record = [...this.sessions.values()].find((item) => item.session.id === id);
    return record ? this.copySession(record.session) : null;
  }

  private copySession(session: CheckoutSession): CheckoutSession { return { ...session }; }

  private validateSession(session: CheckoutSession, req: CheckoutRequest, cart: CommerceCart): void {
    const expiry = Date.parse(session?.expiresAt ?? '');
    if (!session?.id || session.provider !== req.provider || session.cartId !== cart.id || !session.orderIntentId ||
        !['open', 'complete', 'expired'].includes(session.status) || !Number.isFinite(expiry)) {
      throw new Error('checkout_provider_response_invalid');
    }
    if (session.status === 'open' && expiry <= Date.now()) throw new Error('checkout_session_expired');
    if (session.checkoutUrl) {
      let url: URL;
      try { url = new URL(session.checkoutUrl); }
      catch { throw new Error('checkout_url_invalid'); }
      if (url.protocol !== 'https:' || url.username || url.password || url.href.length > 2048) throw new Error('checkout_url_invalid');
    }
  }
}
