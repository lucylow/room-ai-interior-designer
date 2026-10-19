export interface ReconstructionQualityRecord { id:string; label:string; weight:number; tags:string[]; }
export const RECONSTRUCTION_QUALITY_LABELS = ["reprojection", "track", "registered", "points"] as const;
export const RECONSTRUCTION_QUALITY_RECORDS = RECONSTRUCTION_QUALITY_LABELS.map((label,index)=>({'id':`reconstruction_quality-${index}`,label,weight:0.55+index*0.08,tags:[label,'colmap','3dgs','rroom']}));
export function getReconstructionQualityRecord(label:string) { return RECONSTRUCTION_QUALITY_RECORDS.find(item=>item.label===label); }
export function scoreReconstructionQuality(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topReconstructionQuality(query:string,limit=3) {
  return [...RECONSTRUCTION_QUALITY_RECORDS].sort((a,b)=>scoreReconstructionQuality(b.label,query)-scoreReconstructionQuality(a.label,query)).slice(0,limit);
}
export function normalizeReconstructionQuality(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateReconstructionQuality(label:string):boolean { return Boolean(getReconstructionQualityRecord(normalizeReconstructionQuality(label))); }
export function weightReconstructionQuality(label:string):number { return getReconstructionQualityRecord(normalizeReconstructionQuality(label))?.weight ?? 0; }
export function describeReconstructionQuality(label:string):string { const item=getReconstructionQualityRecord(normalizeReconstructionQuality(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicReconstructionQuality0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicReconstructionQuality1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicReconstructionQuality2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicReconstructionQuality3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicReconstructionQuality4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicReconstructionQuality5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
