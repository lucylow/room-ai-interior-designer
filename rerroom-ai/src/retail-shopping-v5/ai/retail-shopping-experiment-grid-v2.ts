/** RE:ROOM AI Retail Shopping Studio V5 — final threshold module. */
import type { RetailProduct, RoomEnvelope, FurnitureSlot, RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface ExperimentAxisV2 { name:string; values:string[]; }
export interface ShoppingExperimentV2 { id:string; title:string; style:StyleName; palette:string; budget:number; prompt:string; }
export function buildShoppingExperimentGrid(room:RoomType,styles:StyleName[],palettes:string[],budgets:number[]):ShoppingExperimentV2[]{const rows:ShoppingExperimentV2[]=[];for(const style of styles)for(const palette of palettes)for(const budget of budgets){rows.push({id:id('experiment',`${room}:${style}:${palette}:${budget}`),title:`${style} · ${palette} · ${money(budget)}`,style,palette,budget,prompt:`Generate a ${style} ${room} with ${palette} cues using buyable products under ${money(budget)} merchandise.`});}return rows;}
export function summarizeExperiment(experiment:ShoppingExperimentV2,products:RetailProduct[]):string[]{const eligible=products.filter(p=>p.styles.includes(experiment.style)&&p.price.amount<=experiment.budget);return[experiment.title,`${eligible.length} direct style matches under budget`,eligible.slice(0,3).map(p=>p.name).join(' · ')||'No direct matches'];}
