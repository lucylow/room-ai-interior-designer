export interface TaxCandidate{id:string;score:number;metadata:Record<string,string>}
export function estimateTax(candidate:TaxCandidate,context:Record<string,number>){const modifier=context['tax']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function capTax(items:TaxCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:estimateTax(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_tax(candidate:TaxCandidate){return {topic:'tax',candidateId:candidate.id,baseline:candidate.score,reason:`tax score derived from bounded demo heuristic`}}
