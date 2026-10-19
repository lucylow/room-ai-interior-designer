export interface MerchantRevenueContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface MerchantRevenueResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class MerchantRevenueService {
  evaluate(input:MerchantRevenueContext, modifiers:Record<string,number>={}):MerchantRevenueResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`monetization context accepted`,`merchant-revenue deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'monetization',module:'merchant-revenue'}};
  }
  summarize(result:MerchantRevenueResult){return {headline:`merchant-revenue {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:MerchantRevenueResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):MerchantRevenueContext{return {id:'merchant-revenue_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','monetization','merchant-revenue'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:MerchantRevenueResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const merchantrevenue=new MerchantRevenueService();
