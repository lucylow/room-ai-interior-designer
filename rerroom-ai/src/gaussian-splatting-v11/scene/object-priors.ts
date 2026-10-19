export interface ObjectPriorsRecord { id:string; label:string; weight:number; tags:string[]; }
export const OBJECT_PRIORS_LABELS = ["sofa", "table", "chair", "window", "door"] as const;
export const OBJECT_PRIORS_RECORDS = OBJECT_PRIORS_LABELS.map((label,index)=>({'id':`object_priors-${index}`,label,weight:0.55+index*0.08,tags:[label,'scene','3dgs','rroom']}));
export function getObjectPriorsRecord(label:string) { return OBJECT_PRIORS_RECORDS.find(item=>item.label===label); }
export function scoreObjectPriors(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topObjectPriors(query:string,limit=3) {
  return [...OBJECT_PRIORS_RECORDS].sort((a,b)=>scoreObjectPriors(b.label,query)-scoreObjectPriors(a.label,query)).slice(0,limit);
}
export function normalizeObjectPriors(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateObjectPriors(label:string):boolean { return Boolean(getObjectPriorsRecord(normalizeObjectPriors(label))); }
export function weightObjectPriors(label:string):number { return getObjectPriorsRecord(normalizeObjectPriors(label))?.weight ?? 0; }
export function describeObjectPriors(label:string):string { const item=getObjectPriorsRecord(normalizeObjectPriors(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicObjectPriors0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicObjectPriors1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicObjectPriors2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicObjectPriors3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicObjectPriors4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicObjectPriors5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
