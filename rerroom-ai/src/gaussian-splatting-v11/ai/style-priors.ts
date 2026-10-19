export interface StylePriorsRecord { id:string; label:string; weight:number; tags:string[]; }
export const STYLE_PRIORS_LABELS = ["modern", "minimalist", "scandinavian", "industrial"] as const;
export const STYLE_PRIORS_RECORDS = STYLE_PRIORS_LABELS.map((label,index)=>({'id':`style_priors-${index}`,label,weight:0.55+index*0.08,tags:[label,'ai','3dgs','rroom']}));
export function getStylePriorsRecord(label:string) { return STYLE_PRIORS_RECORDS.find(item=>item.label===label); }
export function scoreStylePriors(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topStylePriors(query:string,limit=3) {
  return [...STYLE_PRIORS_RECORDS].sort((a,b)=>scoreStylePriors(b.label,query)-scoreStylePriors(a.label,query)).slice(0,limit);
}
export function normalizeStylePriors(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateStylePriors(label:string):boolean { return Boolean(getStylePriorsRecord(normalizeStylePriors(label))); }
export function weightStylePriors(label:string):number { return getStylePriorsRecord(normalizeStylePriors(label))?.weight ?? 0; }
export function describeStylePriors(label:string):string { const item=getStylePriorsRecord(normalizeStylePriors(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicStylePriors0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicStylePriors1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicStylePriors2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicStylePriors3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicStylePriors4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicStylePriors5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
