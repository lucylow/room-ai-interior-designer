export interface CachePolicyRecord { id:string; label:string; weight:number; tags:string[]; }
export const CACHE_POLICY_LABELS = ["hot", "warm", "cold", "evicted"] as const;
export const CACHE_POLICY_RECORDS = CACHE_POLICY_LABELS.map((label,index)=>({'id':`cache_policy-${index}`,label,weight:0.55+index*0.08,tags:[label,'streaming','3dgs','rroom']}));
export function getCachePolicyRecord(label:string) { return CACHE_POLICY_RECORDS.find(item=>item.label===label); }
export function scoreCachePolicy(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCachePolicy(query:string,limit=3) {
  return [...CACHE_POLICY_RECORDS].sort((a,b)=>scoreCachePolicy(b.label,query)-scoreCachePolicy(a.label,query)).slice(0,limit);
}
export function normalizeCachePolicy(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCachePolicy(label:string):boolean { return Boolean(getCachePolicyRecord(normalizeCachePolicy(label))); }
export function weightCachePolicy(label:string):number { return getCachePolicyRecord(normalizeCachePolicy(label))?.weight ?? 0; }
export function describeCachePolicy(label:string):string { const item=getCachePolicyRecord(normalizeCachePolicy(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCachePolicy0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCachePolicy1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCachePolicy2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCachePolicy3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCachePolicy4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCachePolicy5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
