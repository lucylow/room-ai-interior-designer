export interface Scenario_11{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_contemporary:Scenario_11={id:'demo_styles_contemporary',name:'Contemporary',facts:{room:'dining-room',style:'contemporary',budget:'4625',currency:'CAD',channel:'contemporary'},expected:['validated','demo-ready','deterministic']};
export function describe_contemporary(){return Object.entries(scenario_contemporary.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_contemporary(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_contemporary.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

