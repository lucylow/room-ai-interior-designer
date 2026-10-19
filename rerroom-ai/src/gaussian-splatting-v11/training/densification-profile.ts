export interface DensificationProfileRecord { id:string; label:string; weight:number; tags:string[]; }
export const DENSIFICATION_PROFILE_LABELS = ["conservative", "normal", "aggressive", "detail"] as const;
export const DENSIFICATION_PROFILE_RECORDS = DENSIFICATION_PROFILE_LABELS.map((label,index)=>({'id':`densification_profile-${index}`,label,weight:0.55+index*0.08,tags:[label,'training','3dgs','rroom']}));
export function getDensificationProfileRecord(label:string) { return DENSIFICATION_PROFILE_RECORDS.find(item=>item.label===label); }
export function scoreDensificationProfile(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topDensificationProfile(query:string,limit=3) {
  return [...DENSIFICATION_PROFILE_RECORDS].sort((a,b)=>scoreDensificationProfile(b.label,query)-scoreDensificationProfile(a.label,query)).slice(0,limit);
}
export function normalizeDensificationProfile(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateDensificationProfile(label:string):boolean { return Boolean(getDensificationProfileRecord(normalizeDensificationProfile(label))); }
export function weightDensificationProfile(label:string):number { return getDensificationProfileRecord(normalizeDensificationProfile(label))?.weight ?? 0; }
export function describeDensificationProfile(label:string):string { const item=getDensificationProfileRecord(normalizeDensificationProfile(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicDensificationProfile0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicDensificationProfile1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicDensificationProfile2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicDensificationProfile3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicDensificationProfile4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicDensificationProfile5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
