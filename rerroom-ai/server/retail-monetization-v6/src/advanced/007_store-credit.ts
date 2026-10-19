export interface StoreCreditInput { id:string; amount:number; currency:'CAD'|'USD'; status:string; labels:string[]; metadata:Record<string,string> }
export interface StoreCreditDecision { allowed:boolean; score:number; action:'allow'|'review'|'block'; reasons:string[]; metadata:Record<string,string> }
export function evaluateStoreCredit(input:StoreCreditInput, weights:Record<string,number>={}):StoreCreditDecision {
  const statusWeight=weights[input.status] ?? 1;
  const labelFactor=Math.min(1,0.55+input.labels.length*0.05);
  const amountFactor=input.amount<=0?0:Math.min(1,input.amount/2500);
  const score=Math.round(Math.max(0,Math.min(1,statusWeight*0.35+labelFactor*0.25+amountFactor*0.40))*10000)/10000;
  const blocked=input.status==='blocked'||input.status==='fraud';
  const allowed=!blocked && score>=0.45;
  const action=blocked?'block':score>=0.75?'allow':allowed?'review':'block';
  const reasons=[`store domain`, `store-credit evaluator`, `bounded score=${score}`];
  if(input.currency==='CAD') reasons.push('CAD path');
  if(input.labels.includes('demo')) reasons.push('demo-safe');
  return {allowed,score,action,reasons,metadata:{id:input.id,topic:'store-credit'}};
}
export function normalizeStoreCredit(input:StoreCreditInput):StoreCreditInput {return {...input,id:input.id.trim(),amount:Math.round(input.amount*100)/100,labels:[...new Set(input.labels)].sort(),metadata:{...input.metadata}}}
export function explainStoreCredit(decision:StoreCreditDecision) {return {headline:`store-credit: ${decision.action}`,score:decision.score,reasons:decision.reasons}}
export function demoStoreCredit(index:number):StoreCreditInput {return {id:'store-credit_demo_'+index,amount:99+index*23,currency:index%4===0?'USD':'CAD',status:index%7===0?'review':'ready',labels:['demo','store',index%2?'room':'retail'],metadata:{index:String(index)}} as StoreCreditInput}
export function runStoreCreditDemo(count=5) {return Array.from({length:count},(_,i)=>evaluateStoreCredit(demoStoreCredit(i)))}
