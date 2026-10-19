export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_shipping:Scenario_5={id:'demo_checkout_shipping',name:'Shipping',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'shipping'},expected:['validated','demo-ready','deterministic']};
export function describe_shipping(){return Object.entries(scenario_shipping.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_shipping(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_shipping.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

