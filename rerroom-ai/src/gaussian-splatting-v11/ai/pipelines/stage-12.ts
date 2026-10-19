export interface Stage12Input {sceneId:string;seed:number;prompt:string;confidence:number;}
export interface Stage12Output {sceneId:string;seed:number;score:number;tags:string[];warnings:string[];latencyMs:number;}
export function runStage12(input:Stage12Input):Stage12Output {
  const base=(Math.abs(input.seed*(12+3))%1000)/1000;
  const promptSignal=Math.min(1,input.prompt.length/180);
  const score=Math.max(0,Math.min(1,0.35*input.confidence+0.35*promptSignal+0.3*base));
  return {sceneId:input.sceneId,seed:input.seed,score,tags:['3dgs','ai','technical',`stage-12`],warnings:score<0.45?['low-confidence']:[],latencyMs:12+(12*7)+Math.round(base*10)};
}
