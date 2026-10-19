export interface PaymentSelectionContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface PaymentSelectionResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class PaymentSelectionService {
  evaluate(input:PaymentSelectionContext, modifiers:Record<string,number>={}):PaymentSelectionResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`checkout context accepted`,`payment-selection deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'checkout',module:'payment-selection'}};
  }
  summarize(result:PaymentSelectionResult){return {headline:`payment-selection {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:PaymentSelectionResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):PaymentSelectionContext{return {id:'payment-selection_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','checkout','payment-selection'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:PaymentSelectionResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const paymentselection=new PaymentSelectionService();
