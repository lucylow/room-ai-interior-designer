export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_signed_in:Scenario_1={id:'demo_checkout_signed_in',name:'Signed In',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'signed-in'},expected:['validated','demo-ready','deterministic']};
export function describe_signed_in(){return Object.entries(scenario_signed_in.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_signed_in(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_signed_in.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

