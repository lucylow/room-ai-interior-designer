export interface TrustCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreTrust(candidate:TrustCandidate,context:Record<string,number>){const modifier=context['trust']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectTrust(items:TrustCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreTrust(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_trust(candidate:TrustCandidate){return {topic:'trust',candidateId:candidate.id,baseline:candidate.score,reason:`trust score derived from bounded demo heuristic`}}
