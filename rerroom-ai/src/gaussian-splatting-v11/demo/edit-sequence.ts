export interface EditSequenceRecord { id:string; label:string; weight:number; tags:string[]; }
export const EDIT_SEQUENCE_LABELS = ["warm", "brighter", "minimal", "industrial"] as const;
export const EDIT_SEQUENCE_RECORDS = EDIT_SEQUENCE_LABELS.map((label,index)=>({'id':`edit_sequence-${index}`,label,weight:0.55+index*0.08,tags:[label,'demo','3dgs','rroom']}));
export function getEditSequenceRecord(label:string) { return EDIT_SEQUENCE_RECORDS.find(item=>item.label===label); }
export function scoreEditSequence(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topEditSequence(query:string,limit=3) {
  return [...EDIT_SEQUENCE_RECORDS].sort((a,b)=>scoreEditSequence(b.label,query)-scoreEditSequence(a.label,query)).slice(0,limit);
}
export function normalizeEditSequence(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateEditSequence(label:string):boolean { return Boolean(getEditSequenceRecord(normalizeEditSequence(label))); }
export function weightEditSequence(label:string):number { return getEditSequenceRecord(normalizeEditSequence(label))?.weight ?? 0; }
export function describeEditSequence(label:string):string { const item=getEditSequenceRecord(normalizeEditSequence(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicEditSequence0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicEditSequence1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicEditSequence2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicEditSequence3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicEditSequence4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicEditSequence5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
