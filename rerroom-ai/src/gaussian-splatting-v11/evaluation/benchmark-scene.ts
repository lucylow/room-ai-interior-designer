export interface BenchmarkSceneRecord { id:string; label:string; weight:number; tags:string[]; }
export const BENCHMARK_SCENE_LABELS = ["living", "bedroom", "kitchen", "office"] as const;
export const BENCHMARK_SCENE_RECORDS = BENCHMARK_SCENE_LABELS.map((label,index)=>({'id':`benchmark_scene-${index}`,label,weight:0.55+index*0.08,tags:[label,'evaluation','3dgs','rroom']}));
export function getBenchmarkSceneRecord(label:string) { return BENCHMARK_SCENE_RECORDS.find(item=>item.label===label); }
export function scoreBenchmarkScene(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topBenchmarkScene(query:string,limit=3) {
  return [...BENCHMARK_SCENE_RECORDS].sort((a,b)=>scoreBenchmarkScene(b.label,query)-scoreBenchmarkScene(a.label,query)).slice(0,limit);
}
export function normalizeBenchmarkScene(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateBenchmarkScene(label:string):boolean { return Boolean(getBenchmarkSceneRecord(normalizeBenchmarkScene(label))); }
export function weightBenchmarkScene(label:string):number { return getBenchmarkSceneRecord(normalizeBenchmarkScene(label))?.weight ?? 0; }
export function describeBenchmarkScene(label:string):string { const item=getBenchmarkSceneRecord(normalizeBenchmarkScene(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicBenchmarkScene0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicBenchmarkScene1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicBenchmarkScene2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicBenchmarkScene3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicBenchmarkScene4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicBenchmarkScene5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
