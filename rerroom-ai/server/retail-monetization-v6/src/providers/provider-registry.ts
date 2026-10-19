export interface ProviderRegistryContext { id:string; value:number; currency:'CAD'|'USD'; status:string; tags:string[]; metadata:Record<string,string> }
export interface ProviderRegistryResult { ok:boolean; score:number; action:string; reasons:string[]; next?:string; payload:Record<string,unknown> }
export class ProviderRegistryService {
  evaluate(input:ProviderRegistryContext, modifiers:Record<string,number>={}):ProviderRegistryResult {
    const mult=modifiers[input.status] ?? 1;
    const score=Math.max(0,Math.min(1,(input.value>0?Math.min(1,input.value/5000):0.5)*mult));
    const reasons=[`providers context accepted`,`provider-registry deterministic scoring applied`];
    if(input.tags.length)reasons.push(`tags=${input.tags.length}`);
    return {ok:score>=0.25,score,action:score>=0.75?'proceed':score>=0.5?'review':'recover',reasons,next:score<0.5?'human-review':undefined,payload:{id:input.id,group:'providers',module:'provider-registry'}};
  }
  summarize(result:ProviderRegistryResult){return {headline:`provider-registry {result.action}`,score:result.score,reason:result.reasons.join('; ')}}
  shouldBlock(result:ProviderRegistryResult){return !result.ok && result.action==='recover'}
  makeDemoContext(i:number):ProviderRegistryContext{return {id:'provider-registry_demo_'+i,value:125+i*17,currency:'CAD',status:i%3===0?'pending':i%3===1?'ready':'complete',tags:['demo','providers','provider-registry'],metadata:{scenario:String(i)}}}
  runDemo(count=3){const out:ProviderRegistryResult[]=[];for(let i=0;i<count;i++)out.push(this.evaluate(this.makeDemoContext(i)));return out}
}
export const providerregistry=new ProviderRegistryService();
