export interface FrameGovernorRecord { id:string; label:string; weight:number; tags:string[]; }
export const FRAME_GOVERNOR_LABELS = ["16", "24", "30", "60"] as const;
export const FRAME_GOVERNOR_RECORDS = FRAME_GOVERNOR_LABELS.map((label,index)=>({'id':`frame_governor-${index}`,label,weight:0.55+index*0.08,tags:[label,'render','3dgs','rroom']}));
export function getFrameGovernorRecord(label:string) { return FRAME_GOVERNOR_RECORDS.find(item=>item.label===label); }
export function scoreFrameGovernor(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topFrameGovernor(query:string,limit=3) {
  return [...FRAME_GOVERNOR_RECORDS].sort((a,b)=>scoreFrameGovernor(b.label,query)-scoreFrameGovernor(a.label,query)).slice(0,limit);
}
export function normalizeFrameGovernor(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateFrameGovernor(label:string):boolean { return Boolean(getFrameGovernorRecord(normalizeFrameGovernor(label))); }
export function weightFrameGovernor(label:string):number { return getFrameGovernorRecord(normalizeFrameGovernor(label))?.weight ?? 0; }
export function describeFrameGovernor(label:string):string { const item=getFrameGovernorRecord(normalizeFrameGovernor(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicFrameGovernor0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicFrameGovernor1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicFrameGovernor2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicFrameGovernor3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicFrameGovernor4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicFrameGovernor5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
