export interface CameraPresetsRecord { id:string; label:string; weight:number; tags:string[]; }
export const CAMERA_PRESETS_LABELS = ["wide", "normal", "detail", "top"] as const;
export const CAMERA_PRESETS_RECORDS = CAMERA_PRESETS_LABELS.map((label,index)=>({'id':`camera_presets-${index}`,label,weight:0.55+index*0.08,tags:[label,'render','3dgs','rroom']}));
export function getCameraPresetsRecord(label:string) { return CAMERA_PRESETS_RECORDS.find(item=>item.label===label); }
export function scoreCameraPresets(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCameraPresets(query:string,limit=3) {
  return [...CAMERA_PRESETS_RECORDS].sort((a,b)=>scoreCameraPresets(b.label,query)-scoreCameraPresets(a.label,query)).slice(0,limit);
}
export function normalizeCameraPresets(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCameraPresets(label:string):boolean { return Boolean(getCameraPresetsRecord(normalizeCameraPresets(label))); }
export function weightCameraPresets(label:string):number { return getCameraPresetsRecord(normalizeCameraPresets(label))?.weight ?? 0; }
export function describeCameraPresets(label:string):string { const item=getCameraPresetsRecord(normalizeCameraPresets(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCameraPresets0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCameraPresets1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCameraPresets2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCameraPresets3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCameraPresets4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCameraPresets5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
