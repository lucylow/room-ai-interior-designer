export interface ProvenanceInput { id:string; features:number[]; confidence:number }
export interface ProvenanceOutput { score:number; confidence:number; status:'pass'|'review'|'fallback'; reasons:string[] }
export function runProvenance(input:ProvenanceInput):ProvenanceOutput {
  const mean=input.features.length?input.features.reduce((a,b)=>a+b,0)/input.features.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.72+Math.min(1,Math.abs(mean))*.28));
  const status=score>.8?'pass':score>.55?'review':'fallback';
  return {score,confidence:score,status,reasons:['track annotation provenance',status==='pass'?'sufficient evidence':'additional evidence recommended']};
}
