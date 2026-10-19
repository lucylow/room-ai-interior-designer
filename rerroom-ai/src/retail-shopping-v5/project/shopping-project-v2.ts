/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  
  
  StyleName,
} from '../../retail-shopping-v4/domain/commerce-types';

const V5_SNAPSHOT = '2026-10-02';
const CAD = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });

function money(value: number): string {
  return CAD.format(Math.max(0, value));
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

function stableId(prefix: string, input: string): string {
  let hash = 2166136261;
  for (const ch of input) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}


export interface ShoppingProjectV2 { id:string; name:string; clientName:string; roomIds:string[]; activeRevisionId:string; style:StyleName; paletteId:string; budget:number; status:'idea'|'designing'|'shopping'|'approved'|'handoff'; createdAt:string; updatedAt:string; notes:string[]; savedSetIds:string[]; }
export interface ProjectActivity { id:string; projectId:string; type:string; timestamp:string; summary:string; }

export class ShoppingProjectStoreV2 {
  private projects = new Map<string, ShoppingProjectV2>();
  private activity:ProjectActivity[] = [];
  create(input:Pick<ShoppingProjectV2,'name'|'clientName'|'roomIds'|'style'|'paletteId'|'budget'>):ShoppingProjectV2 { const now=new Date().toISOString(); const project:ShoppingProjectV2={id:stableId('project',`${input.name}:${now}`),...input,activeRevisionId:stableId('revision',`${input.name}:A`),status:'idea',createdAt:now,updatedAt:now,notes:[],savedSetIds:[]}; this.projects.set(project.id,project); this.log(project.id,'project-created',`Created ${project.name}`); return {...project}; }
  get(id:string):ShoppingProjectV2|undefined { const value=this.projects.get(id); return value ? {...value,roomIds:[...value.roomIds],notes:[...value.notes],savedSetIds:[...value.savedSetIds]} : undefined; }
  updateStatus(id:string,status:ShoppingProjectV2['status']):ShoppingProjectV2 { const project=this.require(id); project.status=status; project.updatedAt=new Date().toISOString(); this.log(id,'status-changed',`Status → ${status}`); return this.get(id)!; }
  addNote(id:string,note:string):ShoppingProjectV2 { const project=this.require(id); project.notes.push(note); project.updatedAt=new Date().toISOString(); this.log(id,'note-added',note); return this.get(id)!; }
  saveSet(id:string,setId:string):ShoppingProjectV2 { const project=this.require(id); if(!project.savedSetIds.includes(setId)) project.savedSetIds.push(setId); project.updatedAt=new Date().toISOString(); this.log(id,'set-saved',`Saved set ${setId}`); return this.get(id)!; }
  history(id:string):ProjectActivity[] { return this.activity.filter(a=>a.projectId===id).map(a=>({...a})); }
  private require(id:string):ShoppingProjectV2 { const project=this.projects.get(id); if(!project) throw new Error(`Shopping project not found: ${id}`); return project; }
  private log(projectId:string,type:string,summary:string):void { this.activity.push({id:stableId('activity',`${projectId}:${type}:${summary}:${this.activity.length}`),projectId,type,timestamp:new Date().toISOString(),summary}); }
}
