export interface CaptureProfileRecord { id:string; label:string; weight:number; tags:string[]; }
export const CAPTURE_PROFILE_LABELS = ["photo", "video", "mixed"] as const;
export const CAPTURE_PROFILE_RECORDS = CAPTURE_PROFILE_LABELS.map((label,index)=>({'id':`capture_profile-${index}`,label,weight:0.55+index*0.08,tags:[label,'capture','3dgs','rroom']}));
export function getCaptureProfileRecord(label:string) { return CAPTURE_PROFILE_RECORDS.find(item=>item.label===label); }
export function scoreCaptureProfile(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCaptureProfile(query:string,limit=3) {
  return [...CAPTURE_PROFILE_RECORDS].sort((a,b)=>scoreCaptureProfile(b.label,query)-scoreCaptureProfile(a.label,query)).slice(0,limit);
}
export function normalizeCaptureProfile(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCaptureProfile(label:string):boolean { return Boolean(getCaptureProfileRecord(normalizeCaptureProfile(label))); }
export function weightCaptureProfile(label:string):number { return getCaptureProfileRecord(normalizeCaptureProfile(label))?.weight ?? 0; }
export function describeCaptureProfile(label:string):string { const item=getCaptureProfileRecord(normalizeCaptureProfile(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCaptureProfile0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCaptureProfile1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCaptureProfile2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCaptureProfile3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCaptureProfile4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCaptureProfile5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
