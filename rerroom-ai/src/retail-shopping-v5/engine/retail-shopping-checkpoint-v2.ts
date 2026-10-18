/** RE:ROOM AI Retail Shopping Studio V5 — implementation checkpoint. */
import type { RetailProduct, StyleName, RoomType } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}


export interface RetailShoppingCheckpointV2 {
  room: RoomType;
  style: StyleName;
  budget: number;
  productCount: number;
  subtotal: number;
  remaining: number;
  withinBudget: boolean;
  notes: string[];
}

export function shoppingCheckpointV2(room: RoomType, style: StyleName, budget: number, products: RetailProduct[]): RetailShoppingCheckpointV2 {
  const subtotal = products.reduce((sum, product) => sum + product.price.amount, 0);
  const remaining = budget - subtotal;
  return {
    room,
    style,
    budget,
    productCount: products.length,
    subtotal,
    remaining,
    withinBudget: remaining >= 0,
    notes: [
      `${products.length} products selected for ${room}.`,
      `${money(subtotal)} merchandise against a ${money(budget)} cap.`,
      remaining >= 0 ? `${money(remaining)} remains available.` : `${money(Math.abs(remaining))} over the merchandise cap.`,
      'Retail inventory and checkout totals require live revalidation.',
    ],
  };
}
