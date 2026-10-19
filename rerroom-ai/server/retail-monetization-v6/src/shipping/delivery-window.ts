export interface DeliveryWindowContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface DeliveryWindowResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class DeliveryWindowService {
  evaluate(input:DeliveryWindowContext, modifiers:Record<string,number>={}):DeliveryWindowResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`shipping context accepted`,`delivery-window deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'shipping',module:'delivery-window'}};
  }
  summarize(result:DeliveryWindowResult){return {headline:`delivery-window {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:DeliveryWindowResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):DeliveryWindowContext{return {id:'delivery-window_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','shipping','delivery-window'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:DeliveryWindowResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const deliverywindow=new DeliveryWindowService();
