export interface LayoutCandidate{id:string;score:number;metadata:Record<string,string>}
export function scorePlacement(candidate:LayoutCandidate,context:Record<string,number>){const modifier=context['layout']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectPlacement(items:LayoutCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scorePlacement(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_layout(candidate:LayoutCandidate){return {topic:'layout',candidateId:candidate.id,baseline:candidate.score,reason:`layout score derived from bounded demo heuristic`}}
