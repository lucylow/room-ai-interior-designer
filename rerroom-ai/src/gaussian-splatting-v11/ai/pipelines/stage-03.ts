export interface Stage03Input {sceneId:string;seed:number;prompt:string;confidence:number;}
export interface Stage03Output {sceneId:string;seed:number;score:number;tags:string[];warnings:string[];latencyMs:number;}
export function runStage03(input:Stage03Input):Stage03Output {
  const base=(Math.abs(input.seed*(3+3))%1000)/1000;
  const promptSignal=Math.min(1,input.prompt.length/180);
  const score=Math.max(0,Math.min(1,0.35*input.confidence+0.35*promptSignal+0.3*base));
  return {sceneId:input.sceneId,seed:input.seed,score,tags:['3dgs','ai','technical',`stage-03`],warnings:score<0.45?['low-confidence']:[],latencyMs:12+(3*7)+Math.round(base*10)};
}
