export interface LayoutPriorsRecord { id:string; label:string; weight:number; tags:string[]; }
export const LAYOUT_PRIORS_LABELS = ["open", "compact", "symmetrical", "zoned"] as const;
export const LAYOUT_PRIORS_RECORDS = LAYOUT_PRIORS_LABELS.map((label,index)=>({'id':`layout_priors-${index}`,label,weight:0.55+index*0.08,tags:[label,'ai','3dgs','rroom']}));
export function getLayoutPriorsRecord(label:string) { return LAYOUT_PRIORS_RECORDS.find(item=>item.label===label); }
export function scoreLayoutPriors(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topLayoutPriors(query:string,limit=3) {
  return [...LAYOUT_PRIORS_RECORDS].sort((a,b)=>scoreLayoutPriors(b.label,query)-scoreLayoutPriors(a.label,query)).slice(0,limit);
}
export function normalizeLayoutPriors(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateLayoutPriors(label:string):boolean { return Boolean(getLayoutPriorsRecord(normalizeLayoutPriors(label))); }
export function weightLayoutPriors(label:string):number { return getLayoutPriorsRecord(normalizeLayoutPriors(label))?.weight ?? 0; }
export function describeLayoutPriors(label:string):string { const item=getLayoutPriorsRecord(normalizeLayoutPriors(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicLayoutPriors0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicLayoutPriors1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicLayoutPriors2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicLayoutPriors3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicLayoutPriors4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicLayoutPriors5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
