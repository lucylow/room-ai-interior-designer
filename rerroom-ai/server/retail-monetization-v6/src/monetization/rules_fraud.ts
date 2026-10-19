export interface FraudCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreRisk(candidate:FraudCandidate,context:Record<string,number>){const modifier=context['fraud']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectRisk(items:FraudCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreRisk(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_fraud(candidate:FraudCandidate){return {topic:'fraud',candidateId:candidate.id,baseline:candidate.score,reason:`fraud score derived from bounded demo heuristic`}}
