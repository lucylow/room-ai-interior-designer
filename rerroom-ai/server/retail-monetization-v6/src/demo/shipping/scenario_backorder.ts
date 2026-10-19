export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_backorder:Scenario_5={id:'demo_shipping_backorder',name:'Backorder',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'backorder'},expected:['validated','demo-ready','deterministic']};
export function describe_backorder(){return Object.entries(scenario_backorder.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_backorder(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_backorder.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

