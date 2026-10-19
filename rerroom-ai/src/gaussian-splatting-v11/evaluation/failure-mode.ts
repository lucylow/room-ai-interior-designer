export interface FailureModeRecord { id:string; label:string; weight:number; tags:string[]; }
export const FAILURE_MODE_LABELS = ["blur", "drift", "floater", "hole"] as const;
export const FAILURE_MODE_RECORDS = FAILURE_MODE_LABELS.map((label,index)=>({'id':`failure_mode-${index}`,label,weight:0.55+index*0.08,tags:[label,'evaluation','3dgs','rroom']}));
export function getFailureModeRecord(label:string) { return FAILURE_MODE_RECORDS.find(item=>item.label===label); }
export function scoreFailureMode(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topFailureMode(query:string,limit=3) {
  return [...FAILURE_MODE_RECORDS].sort((a,b)=>scoreFailureMode(b.label,query)-scoreFailureMode(a.label,query)).slice(0,limit);
}
export function normalizeFailureMode(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateFailureMode(label:string):boolean { return Boolean(getFailureModeRecord(normalizeFailureMode(label))); }
export function weightFailureMode(label:string):number { return getFailureModeRecord(normalizeFailureMode(label))?.weight ?? 0; }
export function describeFailureMode(label:string):string { const item=getFailureModeRecord(normalizeFailureMode(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicFailureMode0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicFailureMode1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicFailureMode2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicFailureMode3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicFailureMode4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicFailureMode5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
