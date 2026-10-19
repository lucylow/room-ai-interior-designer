export interface CameraTourRecord { id:string; label:string; weight:number; tags:string[]; }
export const CAMERA_TOUR_LABELS = ["entry", "wide", "detail", "window"] as const;
export const CAMERA_TOUR_RECORDS = CAMERA_TOUR_LABELS.map((label,index)=>({'id':`camera_tour-${index}`,label,weight:0.55+index*0.08,tags:[label,'demo','3dgs','rroom']}));
export function getCameraTourRecord(label:string) { return CAMERA_TOUR_RECORDS.find(item=>item.label===label); }
export function scoreCameraTour(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCameraTour(query:string,limit=3) {
  return [...CAMERA_TOUR_RECORDS].sort((a,b)=>scoreCameraTour(b.label,query)-scoreCameraTour(a.label,query)).slice(0,limit);
}
export function normalizeCameraTour(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCameraTour(label:string):boolean { return Boolean(getCameraTourRecord(normalizeCameraTour(label))); }
export function weightCameraTour(label:string):number { return getCameraTourRecord(normalizeCameraTour(label))?.weight ?? 0; }
export function describeCameraTour(label:string):string { const item=getCameraTourRecord(normalizeCameraTour(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCameraTour0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCameraTour1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCameraTour2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCameraTour3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCameraTour4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCameraTour5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
