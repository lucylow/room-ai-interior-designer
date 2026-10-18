import {
  DEMO_RETAIL_ROOMS_V2,
  type DemoRetailRoom,
} from "../src/retail-shopping-v5/demo/retail-demo-room-data-v2";
import { runRetailShoppingV5 } from "../src/retail-shopping-v5/retail-shopping-v5-studio";
import {
  checkoutReadiness,
  type CheckoutReadiness,
} from "../src/retail-shopping-v5/commerce/retail-checkout-readiness-v2";
import type { RetailProduct } from "../src/retail-shopping-v4/domain/commerce-types";

export interface RoomSetOption {
  id: string;
  name: string;
  style: string;
  palette: string;
  budget: number;
  roomType: string;
}

export interface RoomSetViewModel {
  room: DemoRetailRoom;
  products: RetailProduct[];
  alternatives: RetailProduct[];
  checkout: CheckoutReadiness;
  snapshotDate: string;
  hardCap: number;
}

export const roomSetOptions: RoomSetOption[] = DEMO_RETAIL_ROOMS_V2.map((room) => ({
  id: room.id,
  name: room.name,
  style: room.style,
  palette: room.paletteId,
  budget: room.budget.totalBudget,
  roomType: room.room.roomType,
}));

export function createRoomSet(roomId: string, prompt?: string): RoomSetViewModel {
  const room = DEMO_RETAIL_ROOMS_V2.find((candidate) => candidate.id === roomId) ?? DEMO_RETAIL_ROOMS_V2[0];
  const result = runRetailShoppingV5({
    room,
    prompt: prompt ?? room.prompts[0],
    budget: room.budget.totalBudget,
    style: room.style,
    paletteId: room.paletteId,
  });
  const selectedIds = new Set(result.selected.map((product) => product.id));
  const alternatives = result.ranked
    .map((candidate) => candidate.product)
    .filter((product) => !selectedIds.has(product.id))
    .slice(0, 3);

  return {
    room,
    products: result.selected,
    alternatives,
    checkout: checkoutReadiness(result.selected, room.budget.totalBudget),
    snapshotDate: "2026-10-02",
    hardCap: room.budget.totalBudget,
  };
}

export function formatCad(value: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);
}

export function roomSetSubtotal(products: RetailProduct[]): number {
  return products.reduce((total, product) => total + product.price.amount, 0);
}

export function fitLabel(product: RetailProduct): string {
  const tags = product.tags.slice(0, 2).join(" · ");
  return tags
    ? `${product.dimensions.width} × ${product.dimensions.depth} cm · ${tags}`
    : `${product.dimensions.width} × ${product.dimensions.depth} cm`;
}
