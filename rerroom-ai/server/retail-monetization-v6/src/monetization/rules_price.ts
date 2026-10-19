export interface PriceCandidate{id:string;score:number;metadata:Record<string,string>}
export function checkPrice(candidate:PriceCandidate,context:Record<string,number>){const modifier=context['price']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function repriceLine(items:PriceCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:checkPrice(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_price(candidate:PriceCandidate){return {topic:'price',candidateId:candidate.id,baseline:candidate.score,reason:`price score derived from bounded demo heuristic`}}
