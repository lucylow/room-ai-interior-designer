export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_1500:Scenario_3={id:'demo_budgets_budget_1500',name:'Budget 1500',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'budget-1500'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_1500(){return Object.entries(scenario_budget_1500.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_1500(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_1500.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

