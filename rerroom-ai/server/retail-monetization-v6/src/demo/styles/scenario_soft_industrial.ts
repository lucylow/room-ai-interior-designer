export interface Scenario_10{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_soft_industrial:Scenario_10={id:'demo_styles_soft_industrial',name:'Soft Industrial',facts:{room:'home-office',style:'soft-industrial',budget:'4250',currency:'CAD',channel:'soft-industrial'},expected:['validated','demo-ready','deterministic']};
export function describe_soft_industrial(){return Object.entries(scenario_soft_industrial.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_soft_industrial(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_soft_industrial.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

