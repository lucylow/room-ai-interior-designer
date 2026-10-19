export interface HandoffQualityRecord { id:string; label:string; weight:number; tags:string[]; }
export const HANDOFF_QUALITY_LABELS = ["cad", "bim", "retail", "revision"] as const;
export const HANDOFF_QUALITY_RECORDS = HANDOFF_QUALITY_LABELS.map((label,index)=>({'id':`handoff_quality-${index}`,label,weight:0.55+index*0.08,tags:[label,'evaluation','3dgs','rroom']}));
export function getHandoffQualityRecord(label:string) { return HANDOFF_QUALITY_RECORDS.find(item=>item.label===label); }
export function scoreHandoffQuality(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topHandoffQuality(query:string,limit=3) {
  return [...HANDOFF_QUALITY_RECORDS].sort((a,b)=>scoreHandoffQuality(b.label,query)-scoreHandoffQuality(a.label,query)).slice(0,limit);
}
export function normalizeHandoffQuality(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateHandoffQuality(label:string):boolean { return Boolean(getHandoffQualityRecord(normalizeHandoffQuality(label))); }
export function weightHandoffQuality(label:string):number { return getHandoffQualityRecord(normalizeHandoffQuality(label))?.weight ?? 0; }
export function describeHandoffQuality(label:string):string { const item=getHandoffQualityRecord(normalizeHandoffQuality(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicHandoffQuality0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicHandoffQuality1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicHandoffQuality2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicHandoffQuality3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicHandoffQuality4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicHandoffQuality5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
