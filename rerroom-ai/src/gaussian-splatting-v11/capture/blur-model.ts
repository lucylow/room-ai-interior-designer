export interface BlurModelRecord { id:string; label:string; weight:number; tags:string[]; }
export const BLUR_MODEL_LABELS = ["motion", "focus", "shake"] as const;
export const BLUR_MODEL_RECORDS = BLUR_MODEL_LABELS.map((label,index)=>({'id':`blur_model-${index}`,label,weight:0.55+index*0.08,tags:[label,'capture','3dgs','rroom']}));
export function getBlurModelRecord(label:string) { return BLUR_MODEL_RECORDS.find(item=>item.label===label); }
export function scoreBlurModel(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topBlurModel(query:string,limit=3) {
  return [...BLUR_MODEL_RECORDS].sort((a,b)=>scoreBlurModel(b.label,query)-scoreBlurModel(a.label,query)).slice(0,limit);
}
export function normalizeBlurModel(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateBlurModel(label:string):boolean { return Boolean(getBlurModelRecord(normalizeBlurModel(label))); }
export function weightBlurModel(label:string):number { return getBlurModelRecord(normalizeBlurModel(label))?.weight ?? 0; }
export function describeBlurModel(label:string):string { const item=getBlurModelRecord(normalizeBlurModel(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicBlurModel0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicBlurModel1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicBlurModel2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicBlurModel3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicBlurModel4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicBlurModel5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
