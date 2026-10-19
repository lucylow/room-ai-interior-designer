export interface CommissionCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreCommission(candidate:CommissionCandidate,context:Record<string,number>){const modifier=context['commission']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectCommission(items:CommissionCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreCommission(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_commission(candidate:CommissionCandidate){return {topic:'commission',candidateId:candidate.id,baseline:candidate.score,reason:`commission score derived from bounded demo heuristic`}}
