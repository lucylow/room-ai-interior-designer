import { RetailProduct, Budget } from '../domain/commerce-types';
export function remainingBudget(b:Budget){return Math.max(0,b.total-b.committed-b.reserved);}
export function projectedTotal(items:RetailProduct[],b:Budget){const subtotal=items.reduce((s,p)=>s+p.price.amount,0);const shipping=subtotal>=500?0:Math.min(b.shippingAllowance,35);const tax=subtotal*b.taxRate;return{subtotal,shipping,tax,total:subtotal+shipping+tax,remaining:remainingBudget(b)-(subtotal+shipping+tax)};}
export function canSpend(p:RetailProduct,b:Budget,current:number){return current+p.price.amount<=remainingBudget(b);}
export function budgetTier(amount:number){return amount<100?'micro':amount<300?'starter':amount<750?'mid':'anchor';}
