export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_budget_1000:Scenario_2={id:'demo_budgets_budget_1000',name:'Budget 1000',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'budget-1000'},expected:['validated','demo-ready','deterministic']};
export function describe_budget_1000(){return Object.entries(scenario_budget_1000.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_budget_1000(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_budget_1000.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

