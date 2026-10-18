import { DesignOverlay, OverlayPatch } from '../core/types';
export interface DeltaSummary { additions:number; removals:number; styles:number; transforms:number; total:number; }
export class OverlayDeltaLedger {
  summarize(patches:OverlayPatch[]):DeltaSummary {const s:DeltaSummary={additions:0,removals:0,styles:0,transforms:0,total:patches.length};for(const p of patches){if(p.operation==='add')s.additions++;if(p.operation==='remove')s.removals++;if(p.operation==='style')s.styles++;if(p.operation==='move-proposal'||p.operation==='resize-proposal')s.transforms++;}return s;}
  verifyNoSourceMutation(patches:OverlayPatch[]):{safe:boolean;violations:string[]} {const v:string[]=[];for(const p of patches){if(p.path.toLowerCase().includes('authoritative'))v.push(`Patch ${p.id} references authoritative path.`);if(!p.targetAnchor&&['move-proposal','resize-proposal','style'].includes(p.operation))v.push(`Patch ${p.id} has no target anchor.`);}return {safe:v.length===0,violations:v};}
  parentOf(overlay:DesignOverlay){return overlay.parentOverlayId;}
}
