/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type {   RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailDesignTokensV2 { surface:string; border:string; text:string; muted:string; accent:string; positive:string; warning:string; danger:string; radius:number; density:'comfortable'|'compact'; }
export const RETAIL_TOKENS_V2:RetailDesignTokensV2={surface:'surface',border:'border',text:'text',muted:'muted',accent:'accent',positive:'positive',warning:'warning',danger:'danger',radius:14,density:'comfortable'};
export function tokenSetForMode(mode:'light'|'dark'):RetailDesignTokensV2{return mode==='dark'?{...RETAIL_TOKENS_V2,surface:'dark-surface',border:'dark-border',text:'dark-text',muted:'dark-muted'}:RETAIL_TOKENS_V2;}
