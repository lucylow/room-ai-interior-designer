export interface PromptIntentsRecord { id:string; label:string; weight:number; tags:string[]; }
export const PROMPT_INTENTS_LABELS = ["recolor", "restyle", "relight", "declutter"] as const;
export const PROMPT_INTENTS_RECORDS = PROMPT_INTENTS_LABELS.map((label,index)=>({'id':`prompt_intents-${index}`,label,weight:0.55+index*0.08,tags:[label,'ai','3dgs','rroom']}));
export function getPromptIntentsRecord(label:string) { return PROMPT_INTENTS_RECORDS.find(item=>item.label===label); }
export function scorePromptIntents(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topPromptIntents(query:string,limit=3) {
  return [...PROMPT_INTENTS_RECORDS].sort((a,b)=>scorePromptIntents(b.label,query)-scorePromptIntents(a.label,query)).slice(0,limit);
}
export function normalizePromptIntents(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validatePromptIntents(label:string):boolean { return Boolean(getPromptIntentsRecord(normalizePromptIntents(label))); }
export function weightPromptIntents(label:string):number { return getPromptIntentsRecord(normalizePromptIntents(label))?.weight ?? 0; }
export function describePromptIntents(label:string):string { const item=getPromptIntentsRecord(normalizePromptIntents(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicPromptIntents0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicPromptIntents1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicPromptIntents2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicPromptIntents3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicPromptIntents4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicPromptIntents5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
