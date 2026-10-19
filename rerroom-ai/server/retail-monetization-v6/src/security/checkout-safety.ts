import type { Address, CommerceCart, CheckoutRequest } from '../types/commerce';
import { validateCart } from '../cart/cart-validator';

export function sanitizeReturnUrl(url: string, allowedOrigins: string[]): string {
  let parsed: URL;
  try { parsed = new URL(url); }
  catch { throw new Error('invalid_return_url'); }
  const isLocalhost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if ((parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && isLocalhost)) || parsed.username || parsed.password) {
    throw new Error('invalid_return_url');
  }
  if (allowedOrigins.length && !allowedOrigins.some((origin) => parsed.origin === origin)) throw new Error('return_origin_not_allowed');
  return parsed.toString();
}

export function validateCheckoutRequest(req: CheckoutRequest, cart: CommerceCart, allowedOrigins: string[] = []): true {
  if (!req || typeof req !== 'object') throw new Error('invalid_checkout_request');
  if (!cart || typeof cart !== 'object') throw new Error('invalid_cart');
  if (!req.cartId || req.cartId !== cart.id) throw new Error('checkout_cart_mismatch');
  if (!['ship', 'pickup', 'retailer_checkout'].includes(req.fulfillment)) throw new Error('fulfillment_method_invalid');
  if (!req.idempotencyKey?.trim() || req.idempotencyKey.length < 12 || req.idempotencyKey.length > 255 || /[\u0000-\u001f]/.test(req.idempotencyKey)) {
    throw new Error('invalid_idempotency_key');
  }
  sanitizeReturnUrl(req.returnUrl, allowedOrigins);
  sanitizeReturnUrl(req.cancelUrl, allowedOrigins);
  if (req.fulfillment === 'ship') {
    const address = req.shippingAddress;
    if (!address || !address.line1?.trim() || !address.city?.trim() || !address.region?.trim() || !address.postalCode?.trim() || !/^[A-Za-z]{2}$/.test(address.country ?? '')) {
      throw new Error('shipping_address_invalid');
    }
  }
  const issues = validateCart(cart);
  if (issues.some((item) => item.severity === 'error')) throw new Error(issues.map((item) => item.code).join(','));
  return true;
}

export function normalizeCheckoutAddress(address: Address): Address {
  return {
    ...address, line1: address.line1.trim(), line2: address.line2?.trim() || undefined,
    city: address.city.trim(), region: address.region.trim(), postalCode: address.postalCode.trim().toUpperCase(),
    country: address.country.trim().toUpperCase(),
  };
}
