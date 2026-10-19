export interface PurchaseSummaryContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface PurchaseSummaryResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class PurchaseSummaryService {
  evaluate(input:PurchaseSummaryContext, modifiers:Record<string,number>={}):PurchaseSummaryResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`orders context accepted`,`purchase-summary deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'orders',module:'purchase-summary'}};
  }
  summarize(result:PurchaseSummaryResult){return {headline:`purchase-summary {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:PurchaseSummaryResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):PurchaseSummaryContext{return {id:'purchase-summary_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','orders','purchase-summary'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:PurchaseSummaryResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const purchasesummary=new PurchaseSummaryService();
