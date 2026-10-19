export interface AlphaStatisticsRecord { id:string; label:string; weight:number; tags:string[]; }
export const ALPHA_STATISTICS_LABELS = ["mean", "p50", "p95", "saturation"] as const;
export const ALPHA_STATISTICS_RECORDS = ALPHA_STATISTICS_LABELS.map((label,index)=>({'id':`alpha_statistics-${index}`,label,weight:0.55+index*0.08,tags:[label,'render','3dgs','rroom']}));
export function getAlphaStatisticsRecord(label:string) { return ALPHA_STATISTICS_RECORDS.find(item=>item.label===label); }
export function scoreAlphaStatistics(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topAlphaStatistics(query:string,limit=3) {
  return [...ALPHA_STATISTICS_RECORDS].sort((a,b)=>scoreAlphaStatistics(b.label,query)-scoreAlphaStatistics(a.label,query)).slice(0,limit);
}
export function normalizeAlphaStatistics(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateAlphaStatistics(label:string):boolean { return Boolean(getAlphaStatisticsRecord(normalizeAlphaStatistics(label))); }
export function weightAlphaStatistics(label:string):number { return getAlphaStatisticsRecord(normalizeAlphaStatistics(label))?.weight ?? 0; }
export function describeAlphaStatistics(label:string):string { const item=getAlphaStatisticsRecord(normalizeAlphaStatistics(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicAlphaStatistics0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicAlphaStatistics1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicAlphaStatistics2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicAlphaStatistics3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicAlphaStatistics4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicAlphaStatistics5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
