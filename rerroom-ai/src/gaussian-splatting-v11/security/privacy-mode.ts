export interface PrivacyModeRecord { id:string; label:string; weight:number; tags:string[]; }
export const PRIVACY_MODE_LABELS = ["local", "private-cloud", "handoff", "delete"] as const;
export const PRIVACY_MODE_RECORDS = PRIVACY_MODE_LABELS.map((label,index)=>({'id':`privacy_mode-${index}`,label,weight:0.55+index*0.08,tags:[label,'security','3dgs','rroom']}));
export function getPrivacyModeRecord(label:string) { return PRIVACY_MODE_RECORDS.find(item=>item.label===label); }
export function scorePrivacyMode(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topPrivacyMode(query:string,limit=3) {
  return [...PRIVACY_MODE_RECORDS].sort((a,b)=>scorePrivacyMode(b.label,query)-scorePrivacyMode(a.label,query)).slice(0,limit);
}
export function normalizePrivacyMode(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validatePrivacyMode(label:string):boolean { return Boolean(getPrivacyModeRecord(normalizePrivacyMode(label))); }
export function weightPrivacyMode(label:string):number { return getPrivacyModeRecord(normalizePrivacyMode(label))?.weight ?? 0; }
export function describePrivacyMode(label:string):string { const item=getPrivacyModeRecord(normalizePrivacyMode(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicPrivacyMode0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicPrivacyMode1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicPrivacyMode2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicPrivacyMode3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicPrivacyMode4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicPrivacyMode5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
