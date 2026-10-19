export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_minimal_to_cozy:Scenario_3={id:'demo_revisions_minimal_to_cozy',name:'Minimal To Cozy',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'minimal-to-cozy'},expected:['validated','demo-ready','deterministic']};
export function describe_minimal_to_cozy(){return Object.entries(scenario_minimal_to_cozy.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_minimal_to_cozy(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_minimal_to_cozy.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

