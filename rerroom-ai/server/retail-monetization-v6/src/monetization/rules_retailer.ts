export interface RetailerCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreRetailer(candidate:RetailerCandidate,context:Record<string,number>){const modifier=context['retailer']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectRetailer(items:RetailerCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreRetailer(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_retailer(candidate:RetailerCandidate){return {topic:'retailer',candidateId:candidate.id,baseline:candidate.score,reason:`retailer score derived from bounded demo heuristic`}}
