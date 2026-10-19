import { ProviderRequestError } from '../../src/core/provider-http';
import { ServerCheckoutService } from '../services/checkout-service';
import type { CheckoutRequest, CommerceCart, CheckoutSession } from '../../src/types/commerce';

export interface CheckoutApiSuccess {
  ok: true;
  httpStatus: 200;
  sessionId: string;
  checkoutUrl?: string;
  status: CheckoutSession['status'];
}
export interface CheckoutApiFailure {
  ok: false;
  httpStatus: 400 | 409 | 500 | 502 | 503;
  error: { code: string; retryable: boolean };
}
export type CheckoutApiResponse = CheckoutApiSuccess | CheckoutApiFailure;

function errorResponse(error: unknown): CheckoutApiFailure {
  if (error instanceof ProviderRequestError) {
    return {
      ok: false, httpStatus: error.retryable ? 503 : 502,
      error: { code: `${error.provider}_${error.code}`, retryable: error.retryable },
    };
  }
  const message = error instanceof Error ? error.message : '';
  const clientCodes = new Set([
    'invalid_checkout_request', 'invalid_cart', 'fulfillment_method_invalid', 'checkout_cart_mismatch', 'invalid_return_url', 'return_origin_not_allowed', 'invalid_idempotency_key',
    'shipping_address_invalid', 'shipping_address_required', 'provider_not_configured', 'empty_cart', 'checkout_session_expired', 'checkout_cart_changed', 'checkout_cart_changed_cleanup_failed', 'checkout_provider_response_cleanup_failed',
  ]);
  const validationCodes = new Set(['empty_cart', 'invalid_cart', 'invalid_cart_lines', 'invalid_cart_identity', 'invalid_cart_total',
    'invalid_budget_cap', 'invalid_currency', 'budget_exceeded', 'quantity_limit', 'invalid_quantity', 'invalid_price', 'currency_mismatch',
    'inventory_exceeded', 'insufficient_inventory', 'invalid_line_identity', 'invalid_cart_line', 'invalid_product',
    'invalid_commission_rate', 'variant_unavailable', 'line_not_found']);
  if (['checkout_provider_response_invalid', 'checkout_url_invalid', 'stripe_session_response_invalid', 'stripe_checkout_url_invalid', 'shopify_checkout_url_invalid'].includes(message)) {
    return { ok: false, httpStatus: 502, error: { code: 'checkout_provider_response_invalid', retryable: false } };
  }
  if (message.endsWith('_cleanup_failed')) {
    return { ok: false, httpStatus: 503, error: { code: 'checkout_reconciliation_required', retryable: false } };
  }
  const parts = message.split(',').filter(Boolean);
  if (clientCodes.has(message) || (parts.length > 0 && parts.every((part) => validationCodes.has(part)))) {
    const httpStatus = message === 'provider_not_configured' ? 503 : (message === 'checkout_session_expired' || message === 'checkout_cart_changed') ? 409 : 400;
    return { ok: false, httpStatus, error: { code: message, retryable: false } };
  }
  return { ok: false, httpStatus: 500, error: { code: 'internal_error', retryable: false } };
}

async function runCheckout(service: ServerCheckoutService, input: CheckoutRequest, cart: CommerceCart, retry: boolean): Promise<CheckoutApiResponse> {
  try {
    const session = retry ? await service.retry(input, cart) : await service.create(input, cart);
    return { ok: true, httpStatus: 200, sessionId: session.id, checkoutUrl: session.checkoutUrl, status: session.status };
  } catch (error) {
    return errorResponse(error);
  }
}

export function createCheckoutHandler(service: ServerCheckoutService, input: CheckoutRequest, cart: CommerceCart): Promise<CheckoutApiResponse> {
  return runCheckout(service, input, cart, false);
}

export function recoverCheckoutHandler(service: ServerCheckoutService, input: CheckoutRequest, cart: CommerceCart): Promise<CheckoutApiResponse> {
  return runCheckout(service, input, cart, true);
}
