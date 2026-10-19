export interface ColorCastDetectionFeatureInput { values:number[]; prior:number; confidence:number; context:string[] }
export interface ColorCastDetectionFeatureOutput { feature:'color_cast_detection'; score:number; confidence:number; stable:boolean; flags:string[] }
export function runColorCastDetectionFeature(input:ColorCastDetectionFeatureInput):ColorCastDetectionFeatureOutput {
  const values=input.values.filter(Number.isFinite); const mean=values.length?values.reduce((a,b)=>a+b,0)/values.length:0;
  const variance=values.length?values.reduce((a,b)=>a+(b-mean)*(b-mean),0)/values.length:0;
  const stability=1/(1+variance); const score=Math.max(0,Math.min(1,input.confidence*.58+Math.abs(Math.tanh(mean))*0.17+stability*.15+Math.max(0,Math.min(1,input.prior))*.10));
  return {feature:'color_cast_detection',score,confidence:score,stable:score>=.72,flags:score<.6?['review']:[]};
}
