export interface SparsePointStatsRecord { id:string; label:string; weight:number; tags:string[]; }
export const SPARSE_POINT_STATS_LABELS = ["meanError", "medianError", "p90Error", "trackLength"] as const;
export const SPARSE_POINT_STATS_RECORDS = SPARSE_POINT_STATS_LABELS.map((label,index)=>({'id':`sparse_point_stats-${index}`,label,weight:0.55+index*0.08,tags:[label,'colmap','3dgs','rroom']}));
export function getSparsePointStatsRecord(label:string) { return SPARSE_POINT_STATS_RECORDS.find(item=>item.label===label); }
export function scoreSparsePointStats(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topSparsePointStats(query:string,limit=3) {
  return [...SPARSE_POINT_STATS_RECORDS].sort((a,b)=>scoreSparsePointStats(b.label,query)-scoreSparsePointStats(a.label,query)).slice(0,limit);
}
export function normalizeSparsePointStats(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateSparsePointStats(label:string):boolean { return Boolean(getSparsePointStatsRecord(normalizeSparsePointStats(label))); }
export function weightSparsePointStats(label:string):number { return getSparsePointStatsRecord(normalizeSparsePointStats(label))?.weight ?? 0; }
export function describeSparsePointStats(label:string):string { const item=getSparsePointStatsRecord(normalizeSparsePointStats(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicSparsePointStats0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicSparsePointStats1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicSparsePointStats2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicSparsePointStats3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicSparsePointStats4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicSparsePointStats5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
