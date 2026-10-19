export interface BboxprojectorInput { id:string; values:number[]; confidence:number; tags:string[] }
export interface BboxprojectorOutput { label:string; score:number; uncertainty:number; provenance:string[] }
export function runBboxprojector(input:BboxprojectorInput):BboxprojectorOutput {
  const finite=input.values.filter(Number.isFinite);
  const mean=finite.length?finite.reduce((a,b)=>a+b,0)/finite.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.7+Math.min(1,Math.abs(mean))*0.3));
  return {label:score>.75?'high':'review',score,uncertainty:1-score,provenance:['project 3D boxes into normalized 2D camera bounds','synthetic-deterministic']};
}
