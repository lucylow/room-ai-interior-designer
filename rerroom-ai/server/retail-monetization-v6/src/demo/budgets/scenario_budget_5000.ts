export interface Scenario_6{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_5000:Scenario_6={id:'demo_budgets_budget_5000',name:'Budget 5000',facts:{room:'studio',style:'organic-modern',budget:'2750',currency:'CAD',channel:'budget-5000'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_5000(){return Object.entries(scenario_budget_5000.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_5000(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_5000.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

