export interface RateLimitContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface RateLimitResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class RateLimitService {
  evaluate(input:RateLimitContext, modifiers:Record<string,number>={}):RateLimitResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`security context accepted`,`rate-limit deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'security',module:'rate-limit'}};
  }
  summarize(result:RateLimitResult){return {headline:`rate-limit {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:RateLimitResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):RateLimitContext{return {id:'rate-limit_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','security','rate-limit'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:RateLimitResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const ratelimit=new RateLimitService();
