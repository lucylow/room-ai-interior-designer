export interface QualityCaseRecord { id:string; label:string; weight:number; tags:string[]; }
export const QUALITY_CASE_LABELS = ["good", "low-light", "blurred", "sparse"] as const;
export const QUALITY_CASE_RECORDS = QUALITY_CASE_LABELS.map((label,index)=>({'id':`quality_case-${index}`,label,weight:0.55+index*0.08,tags:[label,'demo','3dgs','rroom']}));
export function getQualityCaseRecord(label:string) { return QUALITY_CASE_RECORDS.find(item=>item.label===label); }
export function scoreQualityCase(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topQualityCase(query:string,limit=3) {
  return [...QUALITY_CASE_RECORDS].sort((a,b)=>scoreQualityCase(b.label,query)-scoreQualityCase(a.label,query)).slice(0,limit);
}
export function normalizeQualityCase(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateQualityCase(label:string):boolean { return Boolean(getQualityCaseRecord(normalizeQualityCase(label))); }
export function weightQualityCase(label:string):number { return getQualityCaseRecord(normalizeQualityCase(label))?.weight ?? 0; }
export function describeQualityCase(label:string):string { const item=getQualityCaseRecord(normalizeQualityCase(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicQualityCase0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicQualityCase1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicQualityCase2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicQualityCase3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicQualityCase4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicQualityCase5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
