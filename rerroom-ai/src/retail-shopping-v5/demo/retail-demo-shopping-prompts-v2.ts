/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export const DEMO_SHOPPING_PROMPTS_V2=[
'Create a modern living room under $750 using buyable furniture.',
'Push the same room toward Scandinavian style without changing the CAD walls.',
'Swap the largest item for a smaller option.',
'Find a cheaper alternative that preserves the same visual direction.',
'Try a dark industrial branch with black metal accents.',
'Build a warm neutral bedroom using real catalog examples.',
'Add storage but preserve the 85 cm target walkway.',
'Compare two furniture packages using the same camera angle.',
'Build a premium room-set branch without exceeding the client cap.',
'Keep the existing hero piece and shop only supporting furniture.',
];
