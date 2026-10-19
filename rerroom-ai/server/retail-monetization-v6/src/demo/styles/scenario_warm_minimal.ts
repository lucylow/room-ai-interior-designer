export interface Scenario_9{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_warm_minimal:Scenario_9={id:'demo_styles_warm_minimal',name:'Warm Minimal',facts:{room:'bedroom',style:'warm-minimal',budget:'3875',currency:'CAD',channel:'warm-minimal'},expected:['validated','demo-ready','deterministic']};
export function describe_warm_minimal(){return Object.entries(scenario_warm_minimal.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_warm_minimal(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_warm_minimal.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

