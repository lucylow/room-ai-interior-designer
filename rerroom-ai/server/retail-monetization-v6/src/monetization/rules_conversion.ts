export interface ConversionCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreConversion(candidate:ConversionCandidate,context:Record<string,number>){const modifier=context['conversion']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectAction(items:ConversionCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreConversion(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_conversion(candidate:ConversionCandidate){return {topic:'conversion',candidateId:candidate.id,baseline:candidate.score,reason:`conversion score derived from bounded demo heuristic`}}
