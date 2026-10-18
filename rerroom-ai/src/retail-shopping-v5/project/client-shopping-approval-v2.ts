/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface ClientShoppingApprovalV2 { id:string; roomId:string; revisionId:string; productIds:string[]; budget:number; subtotal:number; status:'draft'|'approved'|'changes-requested'; approvedBy?:string; approvedAt?:string; comment?:string; }
export function draftShoppingApproval(roomId:string,revisionId:string,products:RetailProduct[],budget:number):ClientShoppingApprovalV2{return{id:id('shopping-approval',roomId+revisionId),roomId,revisionId,productIds:products.map(p=>p.id),budget,subtotal:products.reduce((s,p)=>s+p.price.amount,0),status:'draft'};}
export function approveShoppingV2(a:ClientShoppingApprovalV2,approvedBy='client'):ClientShoppingApprovalV2{return{...a,status:'approved',approvedBy,approvedAt:new Date().toISOString()};}
export function requestShoppingChangesV2(a:ClientShoppingApprovalV2,comment:string):ClientShoppingApprovalV2{return{...a,status:'changes-requested',comment};}
