/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface BuyabilityScoreV2 {
  productId: string;
  score: number;
  reasons: string[];
  blockers: string[];
}

export function buyabilityScoreV2(product:RetailProduct):BuyabilityScoreV2 {
  let score = .4;
  const reasons:string[] = [];
  const blockers:string[] = [];
  if(product.sku){score += .15; reasons.push('SKU present');} else blockers.push('Missing SKU');
  if(product.url && product.url !== '#'){score += .15; reasons.push('Purchase link present');} else blockers.push('No purchase link');
  if(product.price.amount > 0){score += .15; reasons.push('Price snapshot present');} else blockers.push('No price');
  if(product.dimensions.width > 0 && product.dimensions.depth > 0){score += .1; reasons.push('Footprint dimensions present');} else blockers.push('Incomplete footprint');
  if(product.availability === 'in-stock') score += .05;
  if(product.availability === 'unknown') reasons.push('Inventory needs live recheck');
  return {productId:product.id,score:clamp(score),reasons,blockers};
}

export function filterPurchaseReady(products:RetailProduct[], requireVerifiedAvailability=false):RetailProduct[]{return products.filter(p=>buyabilityScoreV2(p).blockers.length===0).filter(p=>!requireVerifiedAvailability||p.availability==='in-stock');}
