/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface StyleFilterCoachV2 {
  requestedStyle: StyleName;
  strongestMatches: RetailProduct[];
  nearMatches: RetailProduct[];
  conflicts: RetailProduct[];
  advice: string[];
}

export function coachStyleFilterV2(style: StyleName, products: RetailProduct[]): StyleFilterCoachV2 {
  const scored = products.map((product) => ({
    product,
    score: product.styles.includes(style) ? 1 : product.styles.some(s => normalizeStyleFamily(s, style)) ? .65 : .35,
  }));
  const strongestMatches = scored.filter(item => item.score >= .85).sort((a,b) => b.score - a.score).slice(0, 8).map(x => x.product);
  const nearMatches = scored.filter(item => item.score >= .55 && item.score < .85).sort((a,b) => b.score - a.score).slice(0, 8).map(x => x.product);
  const conflicts = scored.filter(item => item.score < .55).slice(0, 6).map(x => x.product);
  return {
    requestedStyle: style,
    strongestMatches,
    nearMatches,
    conflicts,
    advice: [
      `Start with ${strongestMatches.length} direct ${style} matches before introducing contrast pieces.`,
      `Near matches can be used as bridge pieces without changing the base style direction.`,
    ],
  };
}

function normalizeStyleFamily(a: StyleName, b: StyleName): boolean {
  const pairs = new Set([
    ['modern','contemporary'].join('|'),
    ['minimalist','modern'].join('|'),
    ['scandinavian','japandi'].join('|'),
    ['scandinavian','mid-century'].join('|'),
    ['organic-modern','scandinavian'].join('|'),
    ['industrial','modern'].join('|'),
  ]);
  return pairs.has(`${a}|${b}`) || pairs.has(`${b}|${a}`);
}
