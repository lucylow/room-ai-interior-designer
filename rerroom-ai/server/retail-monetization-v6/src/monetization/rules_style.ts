export interface StyleCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreStyle(candidate:StyleCandidate,context:Record<string,number>){const modifier=context['style']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectStyle(items:StyleCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreStyle(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_style(candidate:StyleCandidate){return {topic:'style',candidateId:candidate.id,baseline:candidate.score,reason:`style score derived from bounded demo heuristic`}}
