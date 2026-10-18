import { createExternalStore, type ExternalStore } from '../store';

export interface ShoppingItem {
  productId: string;
  title: string;
  price: number;
  currency: string;
  savedAt: number;
}

export interface ShoppingDomainState {
  wishlist: ShoppingItem[];
  comparisons: string[];
  lastViewedProductId?: string;
}

export const shoppingStore: ExternalStore<ShoppingDomainState> = createExternalStore({ wishlist: [], comparisons: [] });

export function saveProduct(item: ShoppingItem): void {
  shoppingStore.setState((state) => ({ ...state, wishlist: [...state.wishlist.filter((x) => x.productId !== item.productId), item].slice(-100) }));
}

export function unsaveProduct(productId: string): void { shoppingStore.setState((state) => ({ ...state, wishlist: state.wishlist.filter((x) => x.productId !== productId) })); }
export function setViewed(productId?: string): void { shoppingStore.setState((state) => ({ ...state, lastViewedProductId: productId })); }
