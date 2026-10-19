export interface ViewerModeRecord { id:string; label:string; weight:number; tags:string[]; }
export const VIEWER_MODE_LABELS = ["rgb", "depth", "semantic", "confidence"] as const;
export const VIEWER_MODE_RECORDS = VIEWER_MODE_LABELS.map((label,index)=>({'id':`viewer_mode-${index}`,label,weight:0.55+index*0.08,tags:[label,'ui','3dgs','rroom']}));
export function getViewerModeRecord(label:string) { return VIEWER_MODE_RECORDS.find(item=>item.label===label); }
export function scoreViewerMode(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topViewerMode(query:string,limit=3) {
  return [...VIEWER_MODE_RECORDS].sort((a,b)=>scoreViewerMode(b.label,query)-scoreViewerMode(a.label,query)).slice(0,limit);
}
export function normalizeViewerMode(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateViewerMode(label:string):boolean { return Boolean(getViewerModeRecord(normalizeViewerMode(label))); }
export function weightViewerMode(label:string):number { return getViewerModeRecord(normalizeViewerMode(label))?.weight ?? 0; }
export function describeViewerMode(label:string):string { const item=getViewerModeRecord(normalizeViewerMode(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicViewerMode0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicViewerMode1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicViewerMode2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicViewerMode3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicViewerMode4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicViewerMode5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
