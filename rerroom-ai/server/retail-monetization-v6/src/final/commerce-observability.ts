export interface CommerceTrace { traceId:string; spanId:string; name:string; startedAt:string; durationMs:number; status:'ok'|'error'; attributes:Record<string,string|number|boolean>; }
export function startTrace(name:string,attributes:CommerceTrace['attributes']={}):CommerceTrace{return {traceId:`trace_${Date.now().toString(36)}`,spanId:`span_${Math.random().toString(36).slice(2,10)}`,name,startedAt:new Date().toISOString(),durationMs:0,status:'ok',attributes}}
export function finishTrace(trace:CommerceTrace,status:CommerceTrace['status']='ok',durationMs=1){return {...trace,status,durationMs}}
export function traceCheckout(provider:string,cartId:string,total:number){const t=startTrace('checkout.create',{provider,cartId,total});return finishTrace(t,'ok',Math.max(1,provider==='demo'?2:8))}
export function traceCart(cartId:string,lineCount:number){return finishTrace(startTrace('cart.update',{cartId,lineCount}),'ok',1)}
export function traceWebhook(provider:string,eventType:string,verified:boolean){return finishTrace(startTrace('webhook.receive',{provider,eventType,verified}),'ok',3)}
export function tracePurchase(orderId:string,total:number){return finishTrace(startTrace('order.purchase',{orderId,total}),'ok',4)}
export function traceFailure(name:string,message:string){return finishTrace(startTrace(name,{message}),'error',1)}
export function summarizeTraces(traces:CommerceTrace[]){const errors=traces.filter(t=>t.status==='error');const duration=traces.reduce((s,t)=>s+t.durationMs,0);return {count:traces.length,errors:errors.length,errorRate:traces.length?errors.length/traces.length:0,totalDurationMs:duration,averageDurationMs:traces.length?duration/traces.length:0}}
export function dashboardRows(traces:CommerceTrace[]){return traces.map(t=>({traceId:t.traceId,name:t.name,status:t.status,durationMs:t.durationMs,provider:String(t.attributes.provider??'n/a'),cartId:String(t.attributes.cartId??'n/a')}))}
export function slowest(traces:CommerceTrace[],limit=5){return [...traces].sort((a,b)=>b.durationMs-a.durationMs).slice(0,limit)}
export function failures(traces:CommerceTrace[]){return traces.filter(t=>t.status==='error')}
export function healthSummary(traces:CommerceTrace[]){const s=summarizeTraces(traces);return {status:s.errorRate===0?'healthy':s.errorRate<0.05?'degraded':'critical',...s}}
export function exportTraceCsv(traces:CommerceTrace[]){const rows=[['traceId','name','status','durationMs'],...traces.map(t=>[t.traceId,t.name,t.status,String(t.durationMs)])];return rows.map(r=>r.map(v=>`"${v.replace(/"/g,'""')}"`).join(',')).join('\\n')}
export const observabilityVersion='commerce-observability-v6';
