export interface BudgetCandidate{id:string;score:number;metadata:Record<string,string>}
export function reserveBudget(candidate:BudgetCandidate,context:Record<string,number>){const modifier=context['budget']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function releaseBudget(items:BudgetCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:reserveBudget(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_budget(candidate:BudgetCandidate){return {topic:'budget',candidateId:candidate.id,baseline:candidate.score,reason:`budget score derived from bounded demo heuristic`}}
