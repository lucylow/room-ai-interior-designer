/** RE:ROOM AI Retail Shopping Studio V5 — final commerce module. */
import type { RetailProduct, RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface SavedRetailFilterV2 {
  id: string;
  name: string;
  room?: RoomType;
  style?: StyleName;
  paletteId?: string;
  maxPrice?: number;
  maxWidth?: number;
  maxDepth?: number;
  createdAt: string;
}

export class SavedRetailFilterStoreV2 {
  private items = new Map<string, SavedRetailFilterV2>();

  save(input: Omit<SavedRetailFilterV2,'id'|'createdAt'>): SavedRetailFilterV2 {
    const value={...input,id:id('filter',`${input.name}:${Date.now()}`),createdAt:new Date().toISOString()};
    this.items.set(value.id,value);
    return value;
  }

  remove(filterId:string):void { this.items.delete(filterId); }
  list():SavedRetailFilterV2[]{ return [...this.items.values()].sort((a,b)=>a.name.localeCompare(b.name)); }
  get(filterId:string):SavedRetailFilterV2|undefined { return this.items.get(filterId); }
}
