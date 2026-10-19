export interface MeteringContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface MeteringResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class MeteringService {
  evaluate(input:MeteringContext, modifiers:Record<string,number>={}):MeteringResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`subscriptions context accepted`,`metering deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'subscriptions',module:'metering'}};
  }
  summarize(result:MeteringResult){return {headline:`metering {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:MeteringResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):MeteringContext{return {id:'metering_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','subscriptions','metering'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:MeteringResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const metering=new MeteringService();
