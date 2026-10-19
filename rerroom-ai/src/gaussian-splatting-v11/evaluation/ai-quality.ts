export interface AiQualityRecord { id:string; label:string; weight:number; tags:string[]; }
export const AI_QUALITY_LABELS = ["grounding", "style", "palette", "layout"] as const;
export const AI_QUALITY_RECORDS = AI_QUALITY_LABELS.map((label,index)=>({'id':`ai_quality-${index}`,label,weight:0.55+index*0.08,tags:[label,'evaluation','3dgs','rroom']}));
export function getAiQualityRecord(label:string) { return AI_QUALITY_RECORDS.find(item=>item.label===label); }
export function scoreAiQuality(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topAiQuality(query:string,limit=3) {
  return [...AI_QUALITY_RECORDS].sort((a,b)=>scoreAiQuality(b.label,query)-scoreAiQuality(a.label,query)).slice(0,limit);
}
export function normalizeAiQuality(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateAiQuality(label:string):boolean { return Boolean(getAiQualityRecord(normalizeAiQuality(label))); }
export function weightAiQuality(label:string):number { return getAiQualityRecord(normalizeAiQuality(label))?.weight ?? 0; }
export function describeAiQuality(label:string):string { const item=getAiQualityRecord(normalizeAiQuality(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicAiQuality0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicAiQuality1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicAiQuality2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicAiQuality3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicAiQuality4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicAiQuality5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
