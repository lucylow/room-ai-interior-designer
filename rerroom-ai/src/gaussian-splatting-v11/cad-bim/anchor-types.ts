export interface AnchorTypesRecord { id:string; label:string; weight:number; tags:string[]; }
export const ANCHOR_TYPES_LABELS = ["wall", "door", "window", "floor"] as const;
export const ANCHOR_TYPES_RECORDS = ANCHOR_TYPES_LABELS.map((label,index)=>({'id':`anchor_types-${index}`,label,weight:0.55+index*0.08,tags:[label,'cad-bim','3dgs','rroom']}));
export function getAnchorTypesRecord(label:string) { return ANCHOR_TYPES_RECORDS.find(item=>item.label===label); }
export function scoreAnchorTypes(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topAnchorTypes(query:string,limit=3) {
  return [...ANCHOR_TYPES_RECORDS].sort((a,b)=>scoreAnchorTypes(b.label,query)-scoreAnchorTypes(a.label,query)).slice(0,limit);
}
export function normalizeAnchorTypes(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateAnchorTypes(label:string):boolean { return Boolean(getAnchorTypesRecord(normalizeAnchorTypes(label))); }
export function weightAnchorTypes(label:string):number { return getAnchorTypesRecord(normalizeAnchorTypes(label))?.weight ?? 0; }
export function describeAnchorTypes(label:string):string { const item=getAnchorTypesRecord(normalizeAnchorTypes(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicAnchorTypes0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicAnchorTypes1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicAnchorTypes2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicAnchorTypes3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicAnchorTypes4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicAnchorTypes5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
