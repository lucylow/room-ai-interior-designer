export interface TileBudgetRecord { id:string; label:string; weight:number; tags:string[]; }
export const TILE_BUDGET_LABELS = ["preview", "balanced", "high", "ultra"] as const;
export const TILE_BUDGET_RECORDS = TILE_BUDGET_LABELS.map((label,index)=>({'id':`tile_budget-${index}`,label,weight:0.55+index*0.08,tags:[label,'render','3dgs','rroom']}));
export function getTileBudgetRecord(label:string) { return TILE_BUDGET_RECORDS.find(item=>item.label===label); }
export function scoreTileBudget(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topTileBudget(query:string,limit=3) {
  return [...TILE_BUDGET_RECORDS].sort((a,b)=>scoreTileBudget(b.label,query)-scoreTileBudget(a.label,query)).slice(0,limit);
}
export function normalizeTileBudget(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateTileBudget(label:string):boolean { return Boolean(getTileBudgetRecord(normalizeTileBudget(label))); }
export function weightTileBudget(label:string):number { return getTileBudgetRecord(normalizeTileBudget(label))?.weight ?? 0; }
export function describeTileBudget(label:string):string { const item=getTileBudgetRecord(normalizeTileBudget(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicTileBudget0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicTileBudget1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicTileBudget2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicTileBudget3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicTileBudget4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicTileBudget5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
