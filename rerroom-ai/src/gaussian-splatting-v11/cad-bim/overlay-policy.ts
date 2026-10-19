export interface OverlayPolicyRecord { id:string; label:string; weight:number; tags:string[]; }
export const OVERLAY_POLICY_LABELS = ["appearance", "furniture", "lighting", "decor"] as const;
export const OVERLAY_POLICY_RECORDS = OVERLAY_POLICY_LABELS.map((label,index)=>({'id':`overlay_policy-${index}`,label,weight:0.55+index*0.08,tags:[label,'cad-bim','3dgs','rroom']}));
export function getOverlayPolicyRecord(label:string) { return OVERLAY_POLICY_RECORDS.find(item=>item.label===label); }
export function scoreOverlayPolicy(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topOverlayPolicy(query:string,limit=3) {
  return [...OVERLAY_POLICY_RECORDS].sort((a,b)=>scoreOverlayPolicy(b.label,query)-scoreOverlayPolicy(a.label,query)).slice(0,limit);
}
export function normalizeOverlayPolicy(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateOverlayPolicy(label:string):boolean { return Boolean(getOverlayPolicyRecord(normalizeOverlayPolicy(label))); }
export function weightOverlayPolicy(label:string):number { return getOverlayPolicyRecord(normalizeOverlayPolicy(label))?.weight ?? 0; }
export function describeOverlayPolicy(label:string):string { const item=getOverlayPolicyRecord(normalizeOverlayPolicy(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicOverlayPolicy0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicOverlayPolicy1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicOverlayPolicy2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicOverlayPolicy3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicOverlayPolicy4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicOverlayPolicy5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
