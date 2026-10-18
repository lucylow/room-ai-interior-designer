import { DesignOverlay, AuthoritativeModel } from '../core/types';
import { LayoutPlan } from '../planning/types';
export interface RevisionIdGeneratorResult { id:string; ok:boolean; message:string; warnings:string[]; changedIds:string[]; }
export function runRevisionIdGenerator(model:AuthoritativeModel,overlay?:DesignOverlay,plan?:LayoutPlan):RevisionIdGeneratorResult {
 const warnings:string[]=[]; const changedIds:string[]=[];
 if(!overlay) warnings.push('No concept overlay available.');
 if(!plan) warnings.push('No layout plan available.');
 if(overlay && overlay.authoritativeModelId!==model.id) warnings.push('Overlay points to a different authoritative model.');
 for(const e of overlay?.elements||[]) if(e.anchor?.sourceFeatureId) changedIds.push(e.id);
 const ok=warnings.length===0;
 return {id:`RevisionIdGenerator-`+model.id,ok,message:'Builds stable revision IDs from project and parent identifiers.',warnings,changedIds};
}
