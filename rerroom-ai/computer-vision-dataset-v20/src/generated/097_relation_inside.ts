export interface RelationInsideFeatureInput { values:number[]; prior:number; confidence:number; context:string[] }
export interface RelationInsideFeatureOutput { feature:'relation_inside'; score:number; confidence:number; stable:boolean; flags:string[] }
export function runRelationInsideFeature(input:RelationInsideFeatureInput):RelationInsideFeatureOutput {
  const values=input.values.filter(Number.isFinite); const mean=values.length?values.reduce((a,b)=>a+b,0)/values.length:0;
  const variance=values.length?values.reduce((a,b)=>a+(b-mean)*(b-mean),0)/values.length:0;
  const stability=1/(1+variance); const score=Math.max(0,Math.min(1,input.confidence*.58+Math.abs(Math.tanh(mean))*0.17+stability*.15+Math.max(0,Math.min(1,input.prior))*.10));
  return {feature:'relation_inside',score,confidence:score,stable:score>=.72,flags:score<.6?['review']:[]};
}
