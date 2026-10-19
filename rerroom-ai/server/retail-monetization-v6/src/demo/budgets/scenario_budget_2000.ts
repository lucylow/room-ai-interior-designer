export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_2000:Scenario_4={id:'demo_budgets_budget_2000',name:'Budget 2000',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'budget-2000'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_2000(){return Object.entries(scenario_budget_2000.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_2000(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_2000.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

