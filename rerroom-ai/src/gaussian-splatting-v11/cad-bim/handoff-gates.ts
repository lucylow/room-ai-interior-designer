export interface HandoffGatesRecord { id:string; label:string; weight:number; tags:string[]; }
export const HANDOFF_GATES_LABELS = ["dimension", "anchor", "revision", "approval"] as const;
export const HANDOFF_GATES_RECORDS = HANDOFF_GATES_LABELS.map((label,index)=>({'id':`handoff_gates-${index}`,label,weight:0.55+index*0.08,tags:[label,'cad-bim','3dgs','rroom']}));
export function getHandoffGatesRecord(label:string) { return HANDOFF_GATES_RECORDS.find(item=>item.label===label); }
export function scoreHandoffGates(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topHandoffGates(query:string,limit=3) {
  return [...HANDOFF_GATES_RECORDS].sort((a,b)=>scoreHandoffGates(b.label,query)-scoreHandoffGates(a.label,query)).slice(0,limit);
}
export function normalizeHandoffGates(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateHandoffGates(label:string):boolean { return Boolean(getHandoffGatesRecord(normalizeHandoffGates(label))); }
export function weightHandoffGates(label:string):number { return getHandoffGatesRecord(normalizeHandoffGates(label))?.weight ?? 0; }
export function describeHandoffGates(label:string):string { const item=getHandoffGatesRecord(normalizeHandoffGates(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicHandoffGates0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicHandoffGates1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicHandoffGates2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicHandoffGates3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicHandoffGates4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicHandoffGates5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
