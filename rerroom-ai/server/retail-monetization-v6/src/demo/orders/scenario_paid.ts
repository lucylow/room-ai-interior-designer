export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_paid:Scenario_0={id:'demo_orders_paid',name:'Paid',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'paid'},expected:['validated','demo-ready','deterministic']};
export function describe_paid(){return Object.entries(scenario_paid.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_paid(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_paid.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

