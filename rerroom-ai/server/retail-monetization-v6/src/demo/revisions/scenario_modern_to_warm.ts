export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_modern_to_warm:Scenario_0={id:'demo_revisions_modern_to_warm',name:'Modern To Warm',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'modern-to-warm'},expected:['validated','demo-ready','deterministic']};
export function describe_modern_to_warm(){return Object.entries(scenario_modern_to_warm.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_modern_to_warm(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_modern_to_warm.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

