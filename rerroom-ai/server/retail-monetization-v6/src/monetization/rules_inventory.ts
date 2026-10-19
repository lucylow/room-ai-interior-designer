export interface InventoryCandidate{id:string;score:number;metadata:Record<string,string>}
export function scoreInventory(candidate:InventoryCandidate,context:Record<string,number>){const modifier=context['inventory']??1;return Math.max(0,Math.min(1,candidate.score*modifier))}
export function reserveInventory(items:InventoryCandidate[],context:Record<string,number>){return [...items].map(x=>({...x,score:scoreInventory(x,context)})).sort((a,b)=>b.score-a.score)[0]??null}
export function explain_inventory(candidate:InventoryCandidate){return {topic:'inventory',candidateId:candidate.id,baseline:candidate.score,reason:`inventory score derived from bounded demo heuristic`}}
