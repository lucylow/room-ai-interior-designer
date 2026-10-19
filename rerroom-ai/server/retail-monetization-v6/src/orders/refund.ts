import { money } from '../core/money';import type { CommerceOrder, Money } from '../types/commerce';
export interface RefundRecord{id:string;orderId:string;amount:Money;reason:string;createdAt:string}
export function refundableAmount(order:CommerceOrder){return order.status==='paid'||order.status==='processing'||order.status==='shipped'||order.status==='completed'?order.totals.total:money(0,order.totals.total.currency)}
