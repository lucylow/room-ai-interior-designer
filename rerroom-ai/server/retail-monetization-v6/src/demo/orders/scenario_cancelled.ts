export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_cancelled:Scenario_5={id:'demo_orders_cancelled',name:'Cancelled',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'cancelled'},expected:['validated','demo-ready','deterministic']};
export function describe_cancelled(){return Object.entries(scenario_cancelled.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_cancelled(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_cancelled.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

