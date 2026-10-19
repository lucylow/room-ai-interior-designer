export interface DiscountCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreDiscount(candidate:DiscountCandidate,context:Record<string,number>){const modifier=context['discount']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectDiscount(items:DiscountCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreDiscount(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_discount(candidate:DiscountCandidate){return {topic:'discount',candidateId:candidate.id,baseline:candidate.score,reason:`discount score derived from bounded demo heuristic`}}
