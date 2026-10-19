export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_modern:Scenario_0={id:'demo_styles_modern',name:'Modern',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'modern'},expected:['validated','demo-ready','deterministic']};
export function describe_modern(){return Object.entries(scenario_modern.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_modern(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_modern.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

