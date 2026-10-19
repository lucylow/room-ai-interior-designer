/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailAccessibilityConfigV2 { reducedMotion:boolean; highContrast:boolean; largeText:boolean; announcePriceChanges:boolean; keyboardOrder:string[]; }
export const DEFAULT_RETAIL_ACCESSIBILITY_V2:RetailAccessibilityConfigV2={reducedMotion:false,highContrast:false,largeText:false,announcePriceChanges:true,keyboardOrder:['search','filters','recommendations','try-in-room','compare','room-set','cart']};
export function accessibleLabel(product:RetailProduct,fit:string){return `${product.name}, ${money(product.price.amount)}, ${fit}, styles ${product.styles.slice(0,2).join(' and ')}`;}
