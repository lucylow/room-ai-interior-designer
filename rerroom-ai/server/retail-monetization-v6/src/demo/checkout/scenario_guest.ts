export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_guest:Scenario_0={id:'demo_checkout_guest',name:'Guest',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'guest'},expected:['validated','demo-ready','deterministic']};
export function describe_guest(){return Object.entries(scenario_guest.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_guest(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_guest.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

