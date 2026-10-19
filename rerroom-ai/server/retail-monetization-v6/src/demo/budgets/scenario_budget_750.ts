export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_750:Scenario_1={id:'demo_budgets_budget_750',name:'Budget 750',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'budget-750'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_750(){return Object.entries(scenario_budget_750.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_750(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_750.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

