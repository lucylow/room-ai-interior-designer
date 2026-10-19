import { runVisualAIV14 } from '../core/visual-ai-v14-engine';
export interface Scenario { id:string; title:string; style:string; palette:string; camera:string; budget:number; notes:string[]; }
export const scenarios:Scenario[]=[
 {id:'v14-modern',title:'Modern Loft',style:'modern',palette:'warm-white',camera:'corner',budget:4200,notes:['large sofa','black accents','oak floor']},
 {id:'v14-minimal',title:'Minimalist Calm',style:'minimalist',palette:'sand',camera:'eye-level',budget:2600,notes:['low furniture','hidden storage','soft daylight']},
 {id:'v14-scandi',title:'Scandinavian Family Room',style:'scandinavian',palette:'sage',camera:'wide',budget:3100,notes:['light oak','textiles','greenery']},
 {id:'v14-industrial',title:'Industrial Studio',style:'industrial',palette:'charcoal',camera:'dollhouse',budget:3500,notes:['metal frame','warm lamps','exposed texture']}
];
export function runScenarios(){ return scenarios.map((s,i)=>({scenario:s,result:runVisualAIV14(100+i)})); }
