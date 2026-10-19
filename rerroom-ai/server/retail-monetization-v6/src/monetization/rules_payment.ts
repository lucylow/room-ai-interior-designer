export interface PaymentCandidate{id:string;score:number;metadata:Record<string,string>}
export function scorePayment(candidate:PaymentCandidate,context:Record<string,number>){const modifier=context['payment']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectPayment(items:PaymentCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scorePayment(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_payment(candidate:PaymentCandidate){return {topic:'payment',candidateId:candidate.id,baseline:candidate.score,reason:`payment score derived from bounded demo heuristic`}}
