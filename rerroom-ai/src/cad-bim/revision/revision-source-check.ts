import { DesignOverlay, AuthoritativeModel } from '../core/types';
import { LayoutPlan } from '../planning/types';
export interface RevisionSourceCheckResult { id:string; ok:boolean; message:string; warnings:string[]; changedIds:string[]; }
export function runRevisionSourceCheck(model:AuthoritativeModel,overlay?:DesignOverlay,plan?:LayoutPlan):RevisionSourceCheckResult {
 const warnings:string[]=[]; const changedIds:string[]=[];
 if(!overlay) warnings.push('No concept overlay available.');
 if(!plan) warnings.push('No layout plan available.');
 if(overlay && overlay.authoritativeModelId!==model.id) warnings.push('Overlay points to a different authoritative model.');
 for(const e of overlay?.elements||[]) if(e.anchor?.sourceFeatureId) changedIds.push(e.id);
 const ok=warnings.length===0;
 return {id:`RevisionSourceCheck-`+model.id,ok,message:'Ensures revisions still target the same source model revision.',warnings,changedIds};
}
