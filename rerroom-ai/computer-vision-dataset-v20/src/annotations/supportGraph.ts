export interface SupportgraphInput { id:string; values:number[]; confidence:number; tags:string[] }
export interface SupportgraphOutput { label:string; score:number; uncertainty:number; provenance:string[] }
export function runSupportgraph(input:SupportgraphInput):SupportgraphOutput {
  const finite=input.values.filter(Number.isFinite);
  const mean=finite.length?finite.reduce((a,b)=>a+b,0)/finite.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.7+Math.min(1,Math.abs(mean))*0.3));
  return {label:score>.75?'high':'review',score,uncertainty:1-score,provenance:['construct object support graphs','synthetic-deterministic']};
}
