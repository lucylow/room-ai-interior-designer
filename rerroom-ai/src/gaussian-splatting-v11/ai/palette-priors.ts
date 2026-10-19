export interface PalettePriorsRecord { id:string; label:string; weight:number; tags:string[]; }
export const PALETTE_PRIORS_LABELS = ["warm", "cool", "neutral", "contrast"] as const;
export const PALETTE_PRIORS_RECORDS = PALETTE_PRIORS_LABELS.map((label,index)=>({'id':`palette_priors-${index}`,label,weight:0.55+index*0.08,tags:[label,'ai','3dgs','rroom']}));
export function getPalettePriorsRecord(label:string) { return PALETTE_PRIORS_RECORDS.find(item=>item.label===label); }
export function scorePalettePriors(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topPalettePriors(query:string,limit=3) {
  return [...PALETTE_PRIORS_RECORDS].sort((a,b)=>scorePalettePriors(b.label,query)-scorePalettePriors(a.label,query)).slice(0,limit);
}
export function normalizePalettePriors(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validatePalettePriors(label:string):boolean { return Boolean(getPalettePriorsRecord(normalizePalettePriors(label))); }
export function weightPalettePriors(label:string):number { return getPalettePriorsRecord(normalizePalettePriors(label))?.weight ?? 0; }
export function describePalettePriors(label:string):string { const item=getPalettePriorsRecord(normalizePalettePriors(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicPalettePriors0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicPalettePriors1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicPalettePriors2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicPalettePriors3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicPalettePriors4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicPalettePriors5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
