export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_ship_local:Scenario_0={id:'demo_shipping_ship_local',name:'Ship Local',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'ship-local'},expected:['validated','demo-ready','deterministic']};
export function describe_ship_local(){return Object.entries(scenario_ship_local.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_ship_local(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_ship_local.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

