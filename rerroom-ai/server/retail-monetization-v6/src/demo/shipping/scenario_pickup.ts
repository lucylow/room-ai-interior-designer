export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_pickup:Scenario_2={id:'demo_shipping_pickup',name:'Pickup',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'pickup'},expected:['validated','demo-ready','deterministic']};
export function describe_pickup(){return Object.entries(scenario_pickup.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_pickup(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_pickup.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

