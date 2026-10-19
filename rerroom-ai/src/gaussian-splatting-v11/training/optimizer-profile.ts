export interface OptimizerProfileRecord { id:string; label:string; weight:number; tags:string[]; }
export const OPTIMIZER_PROFILE_LABELS = ["fast", "balanced", "stable", "quality"] as const;
export const OPTIMIZER_PROFILE_RECORDS = OPTIMIZER_PROFILE_LABELS.map((label,index)=>({'id':`optimizer_profile-${index}`,label,weight:0.55+index*0.08,tags:[label,'training','3dgs','rroom']}));
export function getOptimizerProfileRecord(label:string) { return OPTIMIZER_PROFILE_RECORDS.find(item=>item.label===label); }
export function scoreOptimizerProfile(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topOptimizerProfile(query:string,limit=3) {
  return [...OPTIMIZER_PROFILE_RECORDS].sort((a,b)=>scoreOptimizerProfile(b.label,query)-scoreOptimizerProfile(a.label,query)).slice(0,limit);
}
export function normalizeOptimizerProfile(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateOptimizerProfile(label:string):boolean { return Boolean(getOptimizerProfileRecord(normalizeOptimizerProfile(label))); }
export function weightOptimizerProfile(label:string):number { return getOptimizerProfileRecord(normalizeOptimizerProfile(label))?.weight ?? 0; }
export function describeOptimizerProfile(label:string):string { const item=getOptimizerProfileRecord(normalizeOptimizerProfile(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicOptimizerProfile0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicOptimizerProfile1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicOptimizerProfile2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicOptimizerProfile3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicOptimizerProfile4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicOptimizerProfile5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
