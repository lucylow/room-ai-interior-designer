import { createExternalStore, type ExternalStore } from '../store';
import type { CommerceCart } from '../../../server/retail-monetization-v6/src/types/commerce';

export interface RetailCommerceV6State {
  cartsById: Record<string, CommerceCart>;
}

/** Client-safe snapshots only; payment sessions, provider secrets, and order authority stay server-side. */
export const retailCommerceV6Store: ExternalStore<RetailCommerceV6State> = createExternalStore({ cartsById: {} });

export function recordCommerceCart(cart: CommerceCart): void {
  if (!cart.id || !cart.userId) throw new Error('invalid_cart_snapshot');
  const snapshot: CommerceCart = {
    ...cart,
    lines: cart.lines.map((line) => ({ ...line, unitPrice: { ...line.unitPrice } })),
    totals: {
      subtotal: { ...cart.totals.subtotal }, discount: { ...cart.totals.discount },
      shipping: { ...cart.totals.shipping }, tax: { ...cart.totals.tax },
      total: { ...cart.totals.total }, commissionEstimate: { ...cart.totals.commissionEstimate },
    },
    budgetCap: cart.budgetCap ? { ...cart.budgetCap } : undefined,
    budgetHeadroom: { ...cart.budgetHeadroom },
  };
  retailCommerceV6Store.setState((state) => ({ ...state, cartsById: { ...state.cartsById, [cart.id]: snapshot } }));
}

export function getCommerceCart(cartId: string): CommerceCart | undefined {
  return retailCommerceV6Store.getSnapshot().cartsById[cartId];
}

export function clearCommerceCart(cartId: string): void {
  retailCommerceV6Store.setState((state) => {
    if (!(cartId in state.cartsById)) return state;
    const cartsById = { ...state.cartsById };
    delete cartsById[cartId];
    return { ...state, cartsById };
  });
}
