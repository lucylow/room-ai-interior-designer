export interface RegionStatsRecord { id:string; label:string; weight:number; tags:string[]; }
export const REGION_STATS_LABELS = ["count", "area", "confidence", "coverage"] as const;
export const REGION_STATS_RECORDS = REGION_STATS_LABELS.map((label,index)=>({'id':`region_stats-${index}`,label,weight:0.55+index*0.08,tags:[label,'scene','3dgs','rroom']}));
export function getRegionStatsRecord(label:string) { return REGION_STATS_RECORDS.find(item=>item.label===label); }
export function scoreRegionStats(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topRegionStats(query:string,limit=3) {
  return [...REGION_STATS_RECORDS].sort((a,b)=>scoreRegionStats(b.label,query)-scoreRegionStats(a.label,query)).slice(0,limit);
}
export function normalizeRegionStats(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateRegionStats(label:string):boolean { return Boolean(getRegionStatsRecord(normalizeRegionStats(label))); }
export function weightRegionStats(label:string):number { return getRegionStatsRecord(normalizeRegionStats(label))?.weight ?? 0; }
export function describeRegionStats(label:string):string { const item=getRegionStatsRecord(normalizeRegionStats(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicRegionStats0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicRegionStats1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicRegionStats2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicRegionStats3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicRegionStats4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicRegionStats5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
