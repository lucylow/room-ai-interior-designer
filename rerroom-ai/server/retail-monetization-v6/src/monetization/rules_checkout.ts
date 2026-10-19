export interface CheckoutCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreCheckout(candidate:CheckoutCandidate,context:Record<string,number>){const modifier=context['checkout']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectCheckout(items:CheckoutCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreCheckout(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_checkout(candidate:CheckoutCandidate){return {topic:'checkout',candidateId:candidate.id,baseline:candidate.score,reason:`checkout score derived from bounded demo heuristic`}}
