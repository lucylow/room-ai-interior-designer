export interface MemoryBudgetRecord { id:string; label:string; weight:number; tags:string[]; }
export const MEMORY_BUDGET_LABELS = ["mobile", "desktop", "tablet", "vr"] as const;
export const MEMORY_BUDGET_RECORDS = MEMORY_BUDGET_LABELS.map((label,index)=>({'id':`memory_budget-${index}`,label,weight:0.55+index*0.08,tags:[label,'streaming','3dgs','rroom']}));
export function getMemoryBudgetRecord(label:string) { return MEMORY_BUDGET_RECORDS.find(item=>item.label===label); }
export function scoreMemoryBudget(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topMemoryBudget(query:string,limit=3) {
  return [...MEMORY_BUDGET_RECORDS].sort((a,b)=>scoreMemoryBudget(b.label,query)-scoreMemoryBudget(a.label,query)).slice(0,limit);
}
export function normalizeMemoryBudget(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateMemoryBudget(label:string):boolean { return Boolean(getMemoryBudgetRecord(normalizeMemoryBudget(label))); }
export function weightMemoryBudget(label:string):number { return getMemoryBudgetRecord(normalizeMemoryBudget(label))?.weight ?? 0; }
export function describeMemoryBudget(label:string):string { const item=getMemoryBudgetRecord(normalizeMemoryBudget(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicMemoryBudget0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicMemoryBudget1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicMemoryBudget2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicMemoryBudget3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicMemoryBudget4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicMemoryBudget5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
