export interface InspectorTabRecord { id:string; label:string; weight:number; tags:string[]; }
export const INSPECTOR_TAB_LABELS = ["scene", "splat", "anchor", "quality"] as const;
export const INSPECTOR_TAB_RECORDS = INSPECTOR_TAB_LABELS.map((label,index)=>({'id':`inspector_tab-${index}`,label,weight:0.55+index*0.08,tags:[label,'ui','3dgs','rroom']}));
export function getInspectorTabRecord(label:string) { return INSPECTOR_TAB_RECORDS.find(item=>item.label===label); }
export function scoreInspectorTab(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topInspectorTab(query:string,limit=3) {
  return [...INSPECTOR_TAB_RECORDS].sort((a,b)=>scoreInspectorTab(b.label,query)-scoreInspectorTab(a.label,query)).slice(0,limit);
}
export function normalizeInspectorTab(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateInspectorTab(label:string):boolean { return Boolean(getInspectorTabRecord(normalizeInspectorTab(label))); }
export function weightInspectorTab(label:string):number { return getInspectorTabRecord(normalizeInspectorTab(label))?.weight ?? 0; }
export function describeInspectorTab(label:string):string { const item=getInspectorTabRecord(normalizeInspectorTab(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicInspectorTab0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicInspectorTab1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicInspectorTab2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicInspectorTab3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicInspectorTab4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicInspectorTab5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
