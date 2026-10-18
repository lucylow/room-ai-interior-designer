/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailShoppingControllerState {
  roomId: string;
  mode: 'browse' | 'try-in-room' | 'compare' | 'cart' | 'saved';
  query: string;
  selectedProductId?: string;
  selectedCategory?: ProductCategory;
  selectedStyle?: StyleName;
  selectedPalette?: string;
  budget: number;
  drawerOpen: boolean;
  loading: boolean;
  error?: string;
}

export class RetailShoppingControllerV2 {
  private state: RetailShoppingControllerState;
  private listeners = new Set<(state: RetailShoppingControllerState) => void>();

  constructor(roomId: string, budget: number) {
    this.state = {
      roomId,
      mode: 'browse',
      query: '',
      budget,
      drawerOpen: true,
      loading: false,
    };
  }

  getState(): RetailShoppingControllerState {
    return { ...this.state };
  }

  subscribe(listener: (state: RetailShoppingControllerState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  patch(patch: Partial<RetailShoppingControllerState>): RetailShoppingControllerState {
    this.state = { ...this.state, ...patch };
    this.emit();
    return this.getState();
  }

  setQuery(query: string): RetailShoppingControllerState {
    return this.patch({ query, mode: 'browse' });
  }

  openProduct(productId: string): RetailShoppingControllerState {
    return this.patch({ selectedProductId: productId, mode: 'try-in-room', drawerOpen: true });
  }

  startCompare(productId: string): RetailShoppingControllerState {
    return this.patch({ selectedProductId: productId, mode: 'compare' });
  }

  setBudget(budget: number): RetailShoppingControllerState {
    return this.patch({ budget: Math.max(0, budget) });
  }

  setStyle(style: StyleName): RetailShoppingControllerState {
    return this.patch({ selectedStyle: style });
  }

  setPalette(palette: string): RetailShoppingControllerState {
    return this.patch({ selectedPalette: palette });
  }

  closeDrawer(): RetailShoppingControllerState { return this.patch({ drawerOpen: false }); }
  openDrawer(): RetailShoppingControllerState { return this.patch({ drawerOpen: true }); }

  setLoading(loading: boolean): RetailShoppingControllerState { return this.patch({ loading }); }
  setError(error?: string): RetailShoppingControllerState { return this.patch({ error }); }

  private emit(): void { for (const listener of this.listeners) listener(this.getState()); }
}
