export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_500:Scenario_0={id:'demo_budgets_budget_500',name:'Budget 500',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'budget-500'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_500(){return Object.entries(scenario_budget_500.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_500(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_500.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

