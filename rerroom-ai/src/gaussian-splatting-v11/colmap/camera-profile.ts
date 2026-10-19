export interface CameraProfileRecord { id:string; label:string; weight:number; tags:string[]; }
export const CAMERA_PROFILE_LABELS = ["PINHOLE", "SIMPLE_PINHOLE", "OPENCV", "SIMPLE_RADIAL"] as const;
export const CAMERA_PROFILE_RECORDS = CAMERA_PROFILE_LABELS.map((label,index)=>({'id':`camera_profile-${index}`,label,weight:0.55+index*0.08,tags:[label,'colmap','3dgs','rroom']}));
export function getCameraProfileRecord(label:string) { return CAMERA_PROFILE_RECORDS.find(item=>item.label===label); }
export function scoreCameraProfile(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCameraProfile(query:string,limit=3) {
  return [...CAMERA_PROFILE_RECORDS].sort((a,b)=>scoreCameraProfile(b.label,query)-scoreCameraProfile(a.label,query)).slice(0,limit);
}
export function normalizeCameraProfile(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCameraProfile(label:string):boolean { return Boolean(getCameraProfileRecord(normalizeCameraProfile(label))); }
export function weightCameraProfile(label:string):number { return getCameraProfileRecord(normalizeCameraProfile(label))?.weight ?? 0; }
export function describeCameraProfile(label:string):string { const item=getCameraProfileRecord(normalizeCameraProfile(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCameraProfile0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCameraProfile1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCameraProfile2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCameraProfile3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCameraProfile4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCameraProfile5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
