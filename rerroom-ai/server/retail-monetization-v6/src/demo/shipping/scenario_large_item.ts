export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_large_item:Scenario_3={id:'demo_shipping_large_item',name:'Large Item',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'large-item'},expected:['validated','demo-ready','deterministic']};
export function describe_large_item(){return Object.entries(scenario_large_item.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_large_item(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_large_item.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

