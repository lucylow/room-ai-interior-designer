export interface DepthlabelerInput { id:string; values:number[]; confidence:number; tags:string[] }
export interface DepthlabelerOutput { label:string; score:number; uncertainty:number; provenance:string[] }
export function runDepthlabeler(input:DepthlabelerInput):DepthlabelerOutput {
  const finite=input.values.filter(Number.isFinite);
  const mean=finite.length?finite.reduce((a,b)=>a+b,0)/finite.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.7+Math.min(1,Math.abs(mean))*0.3));
  return {label:score>.75?'high':'review',score,uncertainty:1-score,provenance:['attach local depth labels and uncertainty bands','synthetic-deterministic']};
}
