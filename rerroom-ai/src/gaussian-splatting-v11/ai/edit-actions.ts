export interface EditActionsRecord { id:string; label:string; weight:number; tags:string[]; }
export const EDIT_ACTIONS_LABELS = ["mask", "replace", "remove", "relight"] as const;
export const EDIT_ACTIONS_RECORDS = EDIT_ACTIONS_LABELS.map((label,index)=>({'id':`edit_actions-${index}`,label,weight:0.55+index*0.08,tags:[label,'ai','3dgs','rroom']}));
export function getEditActionsRecord(label:string) { return EDIT_ACTIONS_RECORDS.find(item=>item.label===label); }
export function scoreEditActions(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topEditActions(query:string,limit=3) {
  return [...EDIT_ACTIONS_RECORDS].sort((a,b)=>scoreEditActions(b.label,query)-scoreEditActions(a.label,query)).slice(0,limit);
}
export function normalizeEditActions(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateEditActions(label:string):boolean { return Boolean(getEditActionsRecord(normalizeEditActions(label))); }
export function weightEditActions(label:string):number { return getEditActionsRecord(normalizeEditActions(label))?.weight ?? 0; }
export function describeEditActions(label:string):string { const item=getEditActionsRecord(normalizeEditActions(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicEditActions0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicEditActions1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicEditActions2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicEditActions3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicEditActions4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicEditActions5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
