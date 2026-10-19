export interface FrameScoreRecord { id:string; label:string; weight:number; tags:string[]; }
export const FRAME_SCORE_LABELS = ["sharpness", "exposure", "overlap", "pose"] as const;
export const FRAME_SCORE_RECORDS = FRAME_SCORE_LABELS.map((label,index)=>({'id':`frame_score-${index}`,label,weight:0.55+index*0.08,tags:[label,'capture','3dgs','rroom']}));
export function getFrameScoreRecord(label:string) { return FRAME_SCORE_RECORDS.find(item=>item.label===label); }
export function scoreFrameScore(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topFrameScore(query:string,limit=3) {
  return [...FRAME_SCORE_RECORDS].sort((a,b)=>scoreFrameScore(b.label,query)-scoreFrameScore(a.label,query)).slice(0,limit);
}
export function normalizeFrameScore(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateFrameScore(label:string):boolean { return Boolean(getFrameScoreRecord(normalizeFrameScore(label))); }
export function weightFrameScore(label:string):number { return getFrameScoreRecord(normalizeFrameScore(label))?.weight ?? 0; }
export function describeFrameScore(label:string):string { const item=getFrameScoreRecord(normalizeFrameScore(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicFrameScore0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicFrameScore1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicFrameScore2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicFrameScore3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicFrameScore4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicFrameScore5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
