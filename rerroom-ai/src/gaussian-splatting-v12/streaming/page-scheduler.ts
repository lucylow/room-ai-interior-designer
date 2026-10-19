export type PageTask={id:string;bytes:number;priority:number;deadlineMs:number;kind:'geometry'|'semantic'|'texture'|'metadata'};
export type ScheduleResult={accepted:PageTask[];deferred:PageTask[];budgetUsed:number};
export function schedule(tasks:PageTask[],budgetBytes:number,nowMs=0):ScheduleResult{const ordered=[...tasks].sort((a,b)=>(b.priority-a.priority)||(a.deadlineMs-b.deadlineMs));const accepted:PageTask[]=[],deferred:PageTask[]=[];let used=0;for(const t of ordered){if(used+t.bytes<=budgetBytes||t.deadlineMs<=nowMs+50){accepted.push(t);used+=t.bytes}else deferred.push(t)}return{accepted,deferred,budgetUsed:used}}
export function starvationScore(deferred:PageTask[],nowMs:number){return deferred.reduce((s,t)=>s+Math.max(0,nowMs-t.deadlineMs),0)/(deferred.length||1)}
