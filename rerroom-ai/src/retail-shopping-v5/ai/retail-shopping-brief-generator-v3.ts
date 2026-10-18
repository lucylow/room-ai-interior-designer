/** RE:ROOM AI Retail Shopping Studio V5 — final depth module. */
import type { RetailProduct, StyleName, RoomType } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}

export interface ShoppingBriefV3 {
  headline: string;
  objective: string;
  room: RoomType;
  style: StyleName;
  budget: number;
  selectedProducts: string[];
  alternates: string[];
  clientLanguage: string[];
  implementationNotes: string[];
}

export function generateShoppingBriefV3(
  room: RoomType,
  style: StyleName,
  budget: number,
  selected: RetailProduct[],
  alternates: RetailProduct[],
): ShoppingBriefV3 {
  const selectedNames = selected.map(product => product.name);
  const alternateNames = alternates.map(product => product.name);
  return {
    headline: `${style} ${room} · buyable design brief`,
    objective: `Translate the approved aesthetic concept into purchasable furniture without changing the authoritative room geometry.`,
    room,
    style,
    budget,
    selectedProducts: selectedNames,
    alternates: alternateNames,
    clientLanguage: [
      `The selected furniture stays within the ${money(budget)} merchandise target.`,
      'Furniture can be previewed in the existing 2D/3D scene before committing.',
      'Alternative products can be swapped without rebuilding the room concept.',
      'Retail pricing and stock should be rechecked before checkout.',
    ],
    implementationNotes: [
      'Preserve CAD/BIM anchors and source dimensions.',
      'Persist product SKU and price-capture timestamps.',
      'Record why each product was selected for the client approval history.',
      'Treat retailer URLs as outbound handoff links unless an authorized cart API is connected.',
    ],
  };
}
