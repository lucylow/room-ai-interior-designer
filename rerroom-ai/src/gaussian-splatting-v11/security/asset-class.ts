export interface AssetClassRecord { id:string; label:string; weight:number; tags:string[]; }
export const ASSET_CLASS_LABELS = ["photo", "splat", "cad", "bim"] as const;
export const ASSET_CLASS_RECORDS = ASSET_CLASS_LABELS.map((label,index)=>({'id':`asset_class-${index}`,label,weight:0.55+index*0.08,tags:[label,'security','3dgs','rroom']}));
export function getAssetClassRecord(label:string) { return ASSET_CLASS_RECORDS.find(item=>item.label===label); }
export function scoreAssetClass(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topAssetClass(query:string,limit=3) {
  return [...ASSET_CLASS_RECORDS].sort((a,b)=>scoreAssetClass(b.label,query)-scoreAssetClass(a.label,query)).slice(0,limit);
}
export function normalizeAssetClass(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateAssetClass(label:string):boolean { return Boolean(getAssetClassRecord(normalizeAssetClass(label))); }
export function weightAssetClass(label:string):number { return getAssetClassRecord(normalizeAssetClass(label))?.weight ?? 0; }
export function describeAssetClass(label:string):string { const item=getAssetClassRecord(normalizeAssetClass(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicAssetClass0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicAssetClass1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicAssetClass2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicAssetClass3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicAssetClass4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicAssetClass5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
