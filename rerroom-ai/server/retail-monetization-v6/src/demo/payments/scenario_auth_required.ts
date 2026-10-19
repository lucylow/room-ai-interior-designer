export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_auth_required:Scenario_3={id:'demo_payments_auth_required',name:'Auth Required',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'auth-required'},expected:['validated','demo-ready','deterministic']};
export function describe_auth_required(){return Object.entries(scenario_auth_required.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_auth_required(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_auth_required.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

