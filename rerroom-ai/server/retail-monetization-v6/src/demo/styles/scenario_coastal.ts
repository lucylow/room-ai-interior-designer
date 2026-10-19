export interface Scenario_7{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_coastal:Scenario_7={id:'demo_styles_coastal',name:'Coastal',facts:{room:'media-room',style:'coastal',budget:'3125',currency:'CAD',channel:'coastal'},expected:['validated','demo-ready','deterministic']};
export function describe_coastal(){return Object.entries(scenario_coastal.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_coastal(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_coastal.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

