/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { evaluateStyleConsistency } from './retail-style-consistency-v2';
import { buyabilityScoreV2 } from './retail-buyability-score-v2';

export interface ShoppingValueReportV2 { merchandise:number; budget:number; headroom:number; styleScore:number; dataScore:number; fitScore:number; overall:number; messages:string[]; }
export function shoppingValueReport(products:RetailProduct[],budget:number,style:StyleName):ShoppingValueReportV2{const merchandise=products.reduce((s,p)=>s+p.price.amount,0);const styleScore=evaluateStyleConsistency(products,style).score;const dataScore=products.length?products.reduce((s,p)=>s+buyabilityScoreV2(p).score,0)/products.length:1;const fitScore=1;const overall=clamp(styleScore*.3+dataScore*.25+fitScore*.25+(merchandise<=budget?.2:0));return{merchandise,budget,headroom:budget-merchandise,styleScore,dataScore,fitScore,overall,messages:[`${money(merchandise)} merchandise selected.`,`${Math.round(styleScore*100)}% style coherence score.`,`${Math.round(dataScore*100)}% catalog buyability score.`]};}
