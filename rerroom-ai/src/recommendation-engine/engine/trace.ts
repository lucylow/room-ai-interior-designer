import type {EngineTrace,EngineTraceStep} from '../core/types';
export class TraceBuilder {
 private steps:EngineTraceStep[]=[];private start=Date.now();
 constructor(private id:string){}
 step(name:string,inputCount:number,outputCount:number,started:number,notes:string[]=[]){this.steps.push({name,durationMs:Date.now()-started,inputCount,outputCount,notes});}
 finish():EngineTrace{return {id:this.id,startedAt:this.start,steps:this.steps,totalMs:Date.now()-this.start};}
}
export const traceId=()=>`trace-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
