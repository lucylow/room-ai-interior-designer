export interface QualityTargetsRecord { id:string; label:string; weight:number; tags:string[]; }
export const QUALITY_TARGETS_LABELS = ["photo", "geometry", "semantic", "style"] as const;
export const QUALITY_TARGETS_RECORDS = QUALITY_TARGETS_LABELS.map((label,index)=>({'id':`quality_targets-${index}`,label,weight:0.55+index*0.08,tags:[label,'ai','3dgs','rroom']}));
export function getQualityTargetsRecord(label:string) { return QUALITY_TARGETS_RECORDS.find(item=>item.label===label); }
export function scoreQualityTargets(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topQualityTargets(query:string,limit=3) {
  return [...QUALITY_TARGETS_RECORDS].sort((a,b)=>scoreQualityTargets(b.label,query)-scoreQualityTargets(a.label,query)).slice(0,limit);
}
export function normalizeQualityTargets(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateQualityTargets(label:string):boolean { return Boolean(getQualityTargetsRecord(normalizeQualityTargets(label))); }
export function weightQualityTargets(label:string):number { return getQualityTargetsRecord(normalizeQualityTargets(label))?.weight ?? 0; }
export function describeQualityTargets(label:string):string { const item=getQualityTargetsRecord(normalizeQualityTargets(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicQualityTargets0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicQualityTargets1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicQualityTargets2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicQualityTargets3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicQualityTargets4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicQualityTargets5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
