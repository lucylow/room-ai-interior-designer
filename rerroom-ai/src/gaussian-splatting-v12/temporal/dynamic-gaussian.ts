import { Gaussian } from '../core/types';
import { clamp } from '../core/types';
export type DynamicState={id:string;phase:number;frequency:number;amplitude:number;axis:'x'|'y'|'z'};
export function advance(g:Gaussian,state:DynamicState,t:number):Gaussian{const amp=state.amplitude*Math.sin(2*Math.PI*state.frequency*t+state.phase);const mean={...g.mean,[state.axis]:g.mean[state.axis]+amp};return {...g,mean,timestamp:t,dynamic:true}}
export function fitDynamic(history:Gaussian[][]):DynamicState[]{const first=history[0]||[];return first.filter(g=>g.dynamic).map((g,i)=>({id:g.id,phase:(i%7)*.2,frequency:.25+(i%5)*.05,amplitude:clamp(Math.max(g.scale.x,g.scale.y,g.scale.z)*.2,.01,.15),axis:i%3===0?'x':i%3===1?'y':'z'}))}
