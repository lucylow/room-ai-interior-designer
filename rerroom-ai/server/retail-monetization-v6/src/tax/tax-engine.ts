import { money } from '../core/money'; import type { CommerceCart, TaxQuote, Address } from '../types/commerce';
const rates:Record<string,number>={ON:0.13,QC:0.14975,BC:0.12,AB:0.05,MB:0.12,SK:0.11,NS:0.1495,NB:0.15,NL:0.15,PE:0.15,YT:0.05,NT:0.05,NU:0.05};
export function quoteTax(cart:CommerceCart,address?:Address):TaxQuote{const rate=rates[address?.region??'ON']??0.13;const base=cart.totals.subtotal.amount-cart.totals.discount.amount+cart.totals.shipping.amount;return {jurisdiction:address?.region??'ON',rate,amount:money(base*rate,cart.currency)}}
