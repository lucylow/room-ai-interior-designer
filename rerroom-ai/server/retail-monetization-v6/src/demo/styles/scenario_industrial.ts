export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_industrial:Scenario_3={id:'demo_styles_industrial',name:'Industrial',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'industrial'},expected:['validated','demo-ready','deterministic']};
export function describe_industrial(){return Object.entries(scenario_industrial.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_industrial(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_industrial.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

