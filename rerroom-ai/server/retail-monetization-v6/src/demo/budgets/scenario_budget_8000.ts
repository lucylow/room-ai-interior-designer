export interface Scenario_7{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_8000:Scenario_7={id:'demo_budgets_budget_8000',name:'Budget 8000',facts:{room:'media-room',style:'coastal',budget:'3125',currency:'CAD',channel:'budget-8000'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_8000(){return Object.entries(scenario_budget_8000.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_8000(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_8000.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

