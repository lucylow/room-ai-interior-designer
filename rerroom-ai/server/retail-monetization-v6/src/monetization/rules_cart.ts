export interface CartCandidate{id:string;score:number;metadata:Record<string,string>}
export function mergeLine(candidate:CartCandidate,context:Record<string,number>){const modifier=context['cart']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function splitLine(items:CartCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:mergeLine(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_cart(candidate:CartCandidate){return {topic:'cart',candidateId:candidate.id,baseline:candidate.score,reason:`cart score derived from bounded demo heuristic`}}
