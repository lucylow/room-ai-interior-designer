export interface RequestPriorityRecord { id:string; label:string; weight:number; tags:string[]; }
export const REQUEST_PRIORITY_LABELS = ["camera", "semantic", "anchor", "background"] as const;
export const REQUEST_PRIORITY_RECORDS = REQUEST_PRIORITY_LABELS.map((label,index)=>({'id':`request_priority-${index}`,label,weight:0.55+index*0.08,tags:[label,'streaming','3dgs','rroom']}));
export function getRequestPriorityRecord(label:string) { return REQUEST_PRIORITY_RECORDS.find(item=>item.label===label); }
export function scoreRequestPriority(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topRequestPriority(query:string,limit=3) {
  return [...REQUEST_PRIORITY_RECORDS].sort((a,b)=>scoreRequestPriority(b.label,query)-scoreRequestPriority(a.label,query)).slice(0,limit);
}
export function normalizeRequestPriority(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateRequestPriority(label:string):boolean { return Boolean(getRequestPriorityRecord(normalizeRequestPriority(label))); }
export function weightRequestPriority(label:string):number { return getRequestPriorityRecord(normalizeRequestPriority(label))?.weight ?? 0; }
export function describeRequestPriority(label:string):string { const item=getRequestPriorityRecord(normalizeRequestPriority(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicRequestPriority0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicRequestPriority1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicRequestPriority2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicRequestPriority3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicRequestPriority4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicRequestPriority5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
