export interface ReplayInput { id:string; features:number[]; confidence:number }
export interface ReplayOutput { score:number; confidence:number; status:'pass'|'review'|'fallback'; reasons:string[] }
export function runReplay(input:ReplayInput):ReplayOutput {
  const mean=input.features.length?input.features.reduce((a,b)=>a+b,0)/input.features.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.72+Math.min(1,Math.abs(mean))*.28));
  const status=score>.8?'pass':score>.55?'review':'fallback';
  return {score,confidence:score,status,reasons:['replay recorded vision sequences',status==='pass'?'sufficient evidence':'additional evidence recommended']};
}
