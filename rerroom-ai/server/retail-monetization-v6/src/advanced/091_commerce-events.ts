export interface CommerceEventsInput { id:string; amount:number; currency:'CAD'|'USD'; status:string; labels:string[]; metadata:Record<string,string> }
export interface CommerceEventsDecision { allowed:boolean; score:number; action:'allow'|'review'|'block'; reasons:string[]; metadata:Record<string,string> }
export function evaluateCommerceEvents(input:CommerceEventsInput, weights:Record<string,number>={}):CommerceEventsDecision {
  const statusWeight=weights[input.status] ?? 1;
  const labelFactor=Math.min(1,0.55+input.labels.length*0.05);
  const amountFactor=input.amount<=0?0:Math.min(1,input.amount/2500);
  const score=Math.round(Math.max(0,Math.min(1,statusWeight*0.35+labelFactor*0.25+amountFactor*0.40))*10000)/10000;
  const blocked=input.status==='blocked'||input.status==='fraud';
  const allowed=!blocked && score>=0.45;
  const action=blocked?'block':score>=0.75?'allow':allowed?'review':'block';
  const reasons=[`commerce domain`, `commerce-events evaluator`, `bounded score=${score}`];
  if(input.currency==='CAD') reasons.push('CAD path');
  if(input.labels.includes('demo')) reasons.push('demo-safe');
  return {allowed,score,action,reasons,metadata:{id:input.id,topic:'commerce-events'}};
}
export function normalizeCommerceEvents(input:CommerceEventsInput):CommerceEventsInput {return {...input,id:input.id.trim(),amount:Math.round(input.amount*100)/100,labels:[...new Set(input.labels)].sort(),metadata:{...input.metadata}}}
export function explainCommerceEvents(decision:CommerceEventsDecision) {return {headline:`commerce-events: ${decision.action}`,score:decision.score,reasons:decision.reasons}}
export function demoCommerceEvents(index:number):CommerceEventsInput {return {id:'commerce-events_demo_'+index,amount:99+index*23,currency:index%4===0?'USD':'CAD',status:index%7===0?'review':'ready',labels:['demo','commerce',index%2?'room':'retail'],metadata:{index:String(index)}} as CommerceEventsInput}
export function runCommerceEventsDemo(count=5) {return Array.from({length:count},(_,i)=>evaluateCommerceEvents(demoCommerceEvents(i)))}
