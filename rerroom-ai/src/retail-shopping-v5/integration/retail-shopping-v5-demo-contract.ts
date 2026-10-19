/** RE:ROOM AI Retail Shopping Studio V5 — final threshold module. */
import type {   StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailShoppingDemoContractV2 { mode:'demo'; locale:string; currency:'CAD'; catalogSource:'ikea-ca-snapshot'; liveInventory:false; supports:['search','style-filter','palette-filter','try-in-room','compare','budget','room-set','saved','cart']; }
export const RETAIL_SHOPPING_DEMO_CONTRACT_V2:RetailShoppingDemoContractV2={mode:'demo',locale:'en-CA',currency:'CAD',catalogSource:'ikea-ca-snapshot',liveInventory:false,supports:['search','style-filter','palette-filter','try-in-room','compare','budget','room-set','saved','cart']};
export function demoContractNarrative(){return['Demo mode uses a dated retailer snapshot.','Shopping placement is reversible.','Budget caps are enforced in optimization.','Live stock and checkout must be revalidated before purchase.'];}
