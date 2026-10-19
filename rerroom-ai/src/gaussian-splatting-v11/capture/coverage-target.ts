export interface CoverageTargetRecord { id:string; label:string; weight:number; tags:string[]; }
export const COVERAGE_TARGET_LABELS = ["front", "side", "back", "overhead"] as const;
export const COVERAGE_TARGET_RECORDS = COVERAGE_TARGET_LABELS.map((label,index)=>({'id':`coverage_target-${index}`,label,weight:0.55+index*0.08,tags:[label,'capture','3dgs','rroom']}));
export function getCoverageTargetRecord(label:string) { return COVERAGE_TARGET_RECORDS.find(item=>item.label===label); }
export function scoreCoverageTarget(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topCoverageTarget(query:string,limit=3) {
  return [...COVERAGE_TARGET_RECORDS].sort((a,b)=>scoreCoverageTarget(b.label,query)-scoreCoverageTarget(a.label,query)).slice(0,limit);
}
export function normalizeCoverageTarget(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateCoverageTarget(label:string):boolean { return Boolean(getCoverageTargetRecord(normalizeCoverageTarget(label))); }
export function weightCoverageTarget(label:string):number { return getCoverageTargetRecord(normalizeCoverageTarget(label))?.weight ?? 0; }
export function describeCoverageTarget(label:string):string { const item=getCoverageTargetRecord(normalizeCoverageTarget(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicCoverageTarget0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicCoverageTarget1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicCoverageTarget2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicCoverageTarget3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicCoverageTarget4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicCoverageTarget5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
