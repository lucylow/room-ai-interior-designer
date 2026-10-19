export interface FallbackInput { id:string; features:number[]; confidence:number }
export interface FallbackOutput { score:number; confidence:number; status:'pass'|'review'|'fallback'; reasons:string[] }
export function runFallback(input:FallbackInput):FallbackOutput {
  const mean=input.features.length?input.features.reduce((a,b)=>a+b,0)/input.features.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.72+Math.min(1,Math.abs(mean))*.28));
  const status=score>.8?'pass':score>.55?'review':'fallback';
  return {score,confidence:score,status,reasons:['gracefully downgrade unsupported modalities',status==='pass'?'sufficient evidence':'additional evidence recommended']};
}
