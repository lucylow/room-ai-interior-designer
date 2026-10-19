export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_3000:Scenario_5={id:'demo_budgets_budget_3000',name:'Budget 3000',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'budget-3000'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_3000(){return Object.entries(scenario_budget_3000.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_3000(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_3000.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

