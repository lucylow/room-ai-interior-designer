import type { CommerceCart, Money } from '../types/commerce';
export function assertPrice(cart:CommerceCart,expected:Money,tolerance=0.01){if(cart.totals.total.currency!==expected.currency||Math.abs(cart.totals.total.amount-expected.amount)>tolerance)throw new Error('price_changed_reconfirm_required');return true}
