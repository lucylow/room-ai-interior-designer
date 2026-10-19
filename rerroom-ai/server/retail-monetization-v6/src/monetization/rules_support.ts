export interface SupportCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreSupport(candidate:SupportCandidate,context:Record<string,number>){const modifier=context['support']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectSupport(items:SupportCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreSupport(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_support(candidate:SupportCandidate){return {topic:'support',candidateId:candidate.id,baseline:candidate.score,reason:`support score derived from bounded demo heuristic`}}
