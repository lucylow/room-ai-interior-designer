export interface ShippingCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreShipping(candidate:ShippingCandidate,context:Record<string,number>){const modifier=context['shipping']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectShipping(items:ShippingCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreShipping(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_shipping(candidate:ShippingCandidate){return {topic:'shipping',candidateId:candidate.id,baseline:candidate.score,reason:`shipping score derived from bounded demo heuristic`}}
