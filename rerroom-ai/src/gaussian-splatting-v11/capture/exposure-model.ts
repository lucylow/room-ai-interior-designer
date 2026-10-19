export interface ExposureModelRecord { id:string; label:string; weight:number; tags:string[]; }
export const EXPOSURE_MODEL_LABELS = ["shadow", "highlight", "white-balance"] as const;
export const EXPOSURE_MODEL_RECORDS = EXPOSURE_MODEL_LABELS.map((label,index)=>({'id':`exposure_model-${index}`,label,weight:0.55+index*0.08,tags:[label,'capture','3dgs','rroom']}));
export function getExposureModelRecord(label:string) { return EXPOSURE_MODEL_RECORDS.find(item=>item.label===label); }
export function scoreExposureModel(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topExposureModel(query:string,limit=3) {
  return [...EXPOSURE_MODEL_RECORDS].sort((a,b)=>scoreExposureModel(b.label,query)-scoreExposureModel(a.label,query)).slice(0,limit);
}
export function normalizeExposureModel(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateExposureModel(label:string):boolean { return Boolean(getExposureModelRecord(normalizeExposureModel(label))); }
export function weightExposureModel(label:string):number { return getExposureModelRecord(normalizeExposureModel(label))?.weight ?? 0; }
export function describeExposureModel(label:string):string { const item=getExposureModelRecord(normalizeExposureModel(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicExposureModel0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicExposureModel1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicExposureModel2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicExposureModel3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicExposureModel4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicExposureModel5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
