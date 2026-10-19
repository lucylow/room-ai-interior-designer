export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_pickup_ready:Scenario_3={id:'demo_orders_pickup_ready',name:'Pickup Ready',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'pickup-ready'},expected:['validated','demo-ready','deterministic']};
export function describe_pickup_ready(){return Object.entries(scenario_pickup_ready.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_pickup_ready(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_pickup_ready.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

