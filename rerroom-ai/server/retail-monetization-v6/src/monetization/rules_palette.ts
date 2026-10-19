export interface PaletteCandidate{id:string;score:number;metadata:Record<string,string>}
export function scorePalette(candidate:PaletteCandidate,context:Record<string,number>){const modifier=context['palette']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function selectPalette(items:PaletteCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scorePalette(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_palette(candidate:PaletteCandidate){return {topic:'palette',candidateId:candidate.id,baseline:candidate.score,reason:`palette score derived from bounded demo heuristic`}}
