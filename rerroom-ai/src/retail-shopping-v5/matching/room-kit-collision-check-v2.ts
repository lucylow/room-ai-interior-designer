/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface CollisionIssueV2 { a:string; b:string; overlapM2:number; message:string; }
function boxesOverlap(a:{x:number;y:number;width:number;height:number},b:{x:number;y:number;width:number;height:number}){const w=Math.max(0,Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x));const h=Math.max(0,Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y));return w*h;}
export function detectSlotCollisions(slots:FurnitureSlot[]):CollisionIssueV2[]{const issues:CollisionIssueV2[]=[];for(let i=0;i<slots.length;i++)for(let j=i+1;j<slots.length;j++){const overlap=boxesOverlap(slots[i].bbox,slots[j].bbox);if(overlap>0)issues.push({a:slots[i].id,b:slots[j].id,overlapM2:overlap,message:`Slots overlap by ${overlap.toFixed(2)} m².`});}return issues;}
