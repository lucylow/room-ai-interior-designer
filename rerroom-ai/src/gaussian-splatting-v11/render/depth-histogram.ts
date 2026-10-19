export interface DepthHistogramRecord { id:string; label:string; weight:number; tags:string[]; }
export const DEPTH_HISTOGRAM_LABELS = ["near", "mid", "far", "outlier"] as const;
export const DEPTH_HISTOGRAM_RECORDS = DEPTH_HISTOGRAM_LABELS.map((label,index)=>({'id':`depth_histogram-${index}`,label,weight:0.55+index*0.08,tags:[label,'render','3dgs','rroom']}));
export function getDepthHistogramRecord(label:string) { return DEPTH_HISTOGRAM_RECORDS.find(item=>item.label===label); }
export function scoreDepthHistogram(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topDepthHistogram(query:string,limit=3) {
  return [...DEPTH_HISTOGRAM_RECORDS].sort((a,b)=>scoreDepthHistogram(b.label,query)-scoreDepthHistogram(a.label,query)).slice(0,limit);
}
export function normalizeDepthHistogram(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateDepthHistogram(label:string):boolean { return Boolean(getDepthHistogramRecord(normalizeDepthHistogram(label))); }
export function weightDepthHistogram(label:string):number { return getDepthHistogramRecord(normalizeDepthHistogram(label))?.weight ?? 0; }
export function describeDepthHistogram(label:string):string { const item=getDepthHistogramRecord(normalizeDepthHistogram(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicDepthHistogram0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicDepthHistogram1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicDepthHistogram2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicDepthHistogram3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicDepthHistogram4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicDepthHistogram5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
