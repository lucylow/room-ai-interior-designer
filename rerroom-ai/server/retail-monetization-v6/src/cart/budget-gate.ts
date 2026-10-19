import type { CommerceCart, Money } from '../types/commerce';
export function withinBudget(cart:CommerceCart,nextTotal?:Money){const total=nextTotal??cart.totals.total;return !cart.budgetCap || total.amount<=cart.budgetCap.amount}
export function reserveBudget(cart:CommerceCart,hold:Money){if(cart.budgetCap&&hold.amount>cart.budgetHeadroom.amount)throw new Error('budget_reservation_exceeds_headroom');return {...cart,budgetHeadroom:{amount:Math.max(0,cart.budgetHeadroom.amount-hold.amount),currency:cart.currency}}}
