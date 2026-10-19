export interface DeliveryCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreDelivery(candidate:DeliveryCandidate,context:Record<string,number>){const modifier=context['delivery']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectDelivery(items:DeliveryCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreDelivery(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_delivery(candidate:DeliveryCandidate){return {topic:'delivery',candidateId:candidate.id,baseline:candidate.score,reason:`delivery score derived from bounded demo heuristic`}}
