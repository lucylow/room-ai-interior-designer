export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_WELCOME10:Scenario_0={id:'demo_discounts_WELCOME10',name:'Welcome10',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'WELCOME10'},expected:['validated','demo-ready','deterministic']};
export function describe_WELCOME10(){return Object.entries(scenario_WELCOME10.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_WELCOME10(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_WELCOME10.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

