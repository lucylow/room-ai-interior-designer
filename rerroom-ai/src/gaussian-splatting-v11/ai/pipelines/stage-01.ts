export interface Stage01Input {sceneId:string;seed:number;prompt:string;confidence:number;}
export interface Stage01Output {sceneId:string;seed:number;score:number;tags:string[];warnings:string[];latencyMs:number;}
export function runStage01(input:Stage01Input):Stage01Output {
  const base=(Math.abs(input.seed*(1+3))%1000)/1000;
  const promptSignal=Math.min(1,input.prompt.length/180);
  const score=Math.max(0,Math.min(1,0.35*input.confidence+0.35*promptSignal+0.3*base));
  return {sceneId:input.sceneId,seed:input.seed,score,tags:['3dgs','ai','technical',`stage-01`],warnings:score<0.45?['low-confidence']:[],latencyMs:12+(1*7)+Math.round(base*10)};
}
