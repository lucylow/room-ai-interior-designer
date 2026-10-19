export interface RoomBudgetContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface RoomBudgetResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class RoomBudgetService {
  evaluate(input:RoomBudgetContext, modifiers:Record<string,number>={}):RoomBudgetResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`project context accepted`,`room-budget deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'project',module:'room-budget'}};
  }
  summarize(result:RoomBudgetResult){return {headline:`room-budget {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:RoomBudgetResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):RoomBudgetContext{return {id:'room-budget_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','project','room-budget'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:RoomBudgetResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const roombudget=new RoomBudgetService();
