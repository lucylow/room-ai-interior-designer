export interface CheckpointProfileRecord { id:string; label:string; weight:number; tags:string[]; }
export const CHECKPOINT_PROFILE_LABELS = ["hourly", "milestone", "best", "final"] as const;
export const CHECKPOINT_PROFILE_RECORDS = CHECKPOINT_PROFILE_LABELS.map((label,index)=>({'id':`checkpoint_profile-${index}`,label,weight:0.55+index*0.08,tags:[label,'training','3dgs','rroom']}));
export function getCheckpointProfileRecord(label:string) { return CHECKPOINT_PROFILE_RECORDS.find(item=>item.label===label); }
export function scoreCheckpointProfile(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCheckpointProfile(query:string,limit=3) {
  return [...CHECKPOINT_PROFILE_RECORDS].sort((a,b)=>scoreCheckpointProfile(b.label,query)-scoreCheckpointProfile(a.label,query)).slice(0,limit);
}
export function normalizeCheckpointProfile(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCheckpointProfile(label:string):boolean { return Boolean(getCheckpointProfileRecord(normalizeCheckpointProfile(label))); }
export function weightCheckpointProfile(label:string):number { return getCheckpointProfileRecord(normalizeCheckpointProfile(label))?.weight ?? 0; }
export function describeCheckpointProfile(label:string):string { const item=getCheckpointProfileRecord(normalizeCheckpointProfile(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCheckpointProfile0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCheckpointProfile1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCheckpointProfile2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCheckpointProfile3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCheckpointProfile4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCheckpointProfile5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
