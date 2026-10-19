export interface EvalProfileRecord { id:string; label:string; weight:number; tags:string[]; }
export const EVAL_PROFILE_LABELS = ["preview", "validation", "release", "regression"] as const;
export const EVAL_PROFILE_RECORDS = EVAL_PROFILE_LABELS.map((label,index)=>({'id':`eval_profile-${index}`,label,weight:0.55+index*0.08,tags:[label,'training','3dgs','rroom']}));
export function getEvalProfileRecord(label:string) { return EVAL_PROFILE_RECORDS.find(item=>item.label===label); }
export function scoreEvalProfile(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topEvalProfile(query:string,limit=3) {
  return [...EVAL_PROFILE_RECORDS].sort((a,b)=>scoreEvalProfile(b.label,query)-scoreEvalProfile(a.label,query)).slice(0,limit);
}
export function normalizeEvalProfile(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateEvalProfile(label:string):boolean { return Boolean(getEvalProfileRecord(normalizeEvalProfile(label))); }
export function weightEvalProfile(label:string):number { return getEvalProfileRecord(normalizeEvalProfile(label))?.weight ?? 0; }
export function describeEvalProfile(label:string):string { const item=getEvalProfileRecord(normalizeEvalProfile(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicEvalProfile0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicEvalProfile1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicEvalProfile2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicEvalProfile3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicEvalProfile4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicEvalProfile5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
