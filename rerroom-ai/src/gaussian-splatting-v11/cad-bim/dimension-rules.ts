export interface DimensionRulesRecord { id:string; label:string; weight:number; tags:string[]; }
export const DIMENSION_RULES_LABELS = ["wall", "opening", "ceiling", "clearance"] as const;
export const DIMENSION_RULES_RECORDS = DIMENSION_RULES_LABELS.map((label,index)=>({'id':`dimension_rules-${index}`,label,weight:0.55+index*0.08,tags:[label,'cad-bim','3dgs','rroom']}));
export function getDimensionRulesRecord(label:string) { return DIMENSION_RULES_RECORDS.find(item=>item.label===label); }
export function scoreDimensionRules(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topDimensionRules(query:string,limit=3) {
  return [...DIMENSION_RULES_RECORDS].sort((a,b)=>scoreDimensionRules(b.label,query)-scoreDimensionRules(a.label,query)).slice(0,limit);
}
export function normalizeDimensionRules(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateDimensionRules(label:string):boolean { return Boolean(getDimensionRulesRecord(normalizeDimensionRules(label))); }
export function weightDimensionRules(label:string):number { return getDimensionRulesRecord(normalizeDimensionRules(label))?.weight ?? 0; }
export function describeDimensionRules(label:string):string { const item=getDimensionRulesRecord(normalizeDimensionRules(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicDimensionRules0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicDimensionRules1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicDimensionRules2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicDimensionRules3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicDimensionRules4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicDimensionRules5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
