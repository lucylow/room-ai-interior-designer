export interface MaterialPriorsRecord { id:string; label:string; weight:number; tags:string[]; }
export const MATERIAL_PRIORS_LABELS = ["wood", "stone", "metal", "glass", "textile"] as const;
export const MATERIAL_PRIORS_RECORDS = MATERIAL_PRIORS_LABELS.map((label,index)=>({'id':`material_priors-${index}`,label,weight:0.55+index*0.08,tags:[label,'scene','3dgs','rroom']}));
export function getMaterialPriorsRecord(label:string) { return MATERIAL_PRIORS_RECORDS.find(item=>item.label===label); }
export function scoreMaterialPriors(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topMaterialPriors(query:string,limit=3) {
  return [...MATERIAL_PRIORS_RECORDS].sort((a,b)=>scoreMaterialPriors(b.label,query)-scoreMaterialPriors(a.label,query)).slice(0,limit);
}
export function normalizeMaterialPriors(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateMaterialPriors(label:string):boolean { return Boolean(getMaterialPriorsRecord(normalizeMaterialPriors(label))); }
export function weightMaterialPriors(label:string):number { return getMaterialPriorsRecord(normalizeMaterialPriors(label))?.weight ?? 0; }
export function describeMaterialPriors(label:string):string { const item=getMaterialPriorsRecord(normalizeMaterialPriors(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicMaterialPriors0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicMaterialPriors1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicMaterialPriors2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicMaterialPriors3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicMaterialPriors4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicMaterialPriors5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
