export interface ProjectCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreProject(candidate:ProjectCandidate,context:Record<string,number>){const modifier=context['project']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectProject(items:ProjectCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreProject(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_project(candidate:ProjectCandidate){return {topic:'project',candidateId:candidate.id,baseline:candidate.score,reason:`project score derived from bounded demo heuristic`}}
