/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RoomSetTemplateV2 {
  id: string;
  label: string;
  room: RoomType;
  style: StyleName;
  slots: Array<{ role: string; category: ProductCategory; priority: number }>;
  budgetShare: number;
}

export const ROOM_SET_TEMPLATES_V2: RoomSetTemplateV2[] = [
  { id:'living-core', label:'Living core', room:'living', style:'modern', slots:[{role:'sofa',category:'sofa',priority:1},{role:'coffee table',category:'tables',priority:.7},{role:'accent seating',category:'seating',priority:.6},{role:'storage',category:'storage',priority:.5}], budgetShare:1 },
  { id:'living-scandi', label:'Scandi calm', room:'living', style:'scandinavian', slots:[{role:'seating',category:'seating',priority:1},{role:'coffee table',category:'tables',priority:.7},{role:'storage',category:'storage',priority:.5}], budgetShare:1 },
  { id:'bedroom-scandi', label:'Scandi bedroom', room:'bedroom', style:'scandinavian', slots:[{role:'bed',category:'bed',priority:1},{role:'nightstand',category:'storage',priority:.6},{role:'dresser',category:'storage',priority:.5}], budgetShare:1 },
  { id:'industrial-studio', label:'Industrial studio', room:'studio', style:'industrial', slots:[{role:'desk',category:'desk',priority:1},{role:'storage',category:'storage',priority:.7},{role:'accent seating',category:'seating',priority:.5}], budgetShare:1 },
];

export function templateFor(room:RoomType, style:StyleName): RoomSetTemplateV2 | undefined {
  return ROOM_SET_TEMPLATES_V2.find(t => t.room === room && t.style === style) ?? ROOM_SET_TEMPLATES_V2.find(t => t.room === room);
}

export function templateSummary(template:RoomSetTemplateV2):string[]{return template.slots.map(s=>`${s.role} → ${s.category} · priority ${s.priority}`);}
