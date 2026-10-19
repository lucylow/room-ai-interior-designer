import type { CommerceOrder, Money } from '../types/commerce';
export interface ReconciliationResult{match:boolean;expected:Money;observed:Money;reason:string}
export function reconcile(order:CommerceOrder,observed:Money):ReconciliationResult{const ok=order.totals.total.currency===observed.currency&&Math.abs(order.totals.total.amount-observed.amount)<0.01;return {match:ok,expected:order.totals.total,observed,reason:ok?'amount_matches':'amount_mismatch'}}
