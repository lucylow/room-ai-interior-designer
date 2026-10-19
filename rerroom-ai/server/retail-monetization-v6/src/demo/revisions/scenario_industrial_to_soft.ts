export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_industrial_to_soft:Scenario_2={id:'demo_revisions_industrial_to_soft',name:'Industrial To Soft',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'industrial-to-soft'},expected:['validated','demo-ready','deterministic']};
export function describe_industrial_to_soft(){return Object.entries(scenario_industrial_to_soft.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_industrial_to_soft(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_industrial_to_soft.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

