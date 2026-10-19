export interface ConversionRecordContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface ConversionRecordResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class ConversionRecordService {
  evaluate(input:ConversionRecordContext, modifiers:Record<string,number>={}):ConversionRecordResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`affiliate context accepted`,`conversion-record deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'affiliate',module:'conversion-record'}};
  }
  summarize(result:ConversionRecordResult){return {headline:`conversion-record {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:ConversionRecordResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):ConversionRecordContext{return {id:'conversion-record_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','affiliate','conversion-record'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:ConversionRecordResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const conversionrecord=new ConversionRecordService();
