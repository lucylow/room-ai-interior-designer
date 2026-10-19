export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_blue_to_sage:Scenario_4={id:'demo_revisions_blue_to_sage',name:'Blue To Sage',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'blue-to-sage'},expected:['validated','demo-ready','deterministic']};
export function describe_blue_to_sage(){return Object.entries(scenario_blue_to_sage.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_blue_to_sage(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_blue_to_sage.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

