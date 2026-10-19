export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_mid_century:Scenario_5={id:'demo_styles_mid_century',name:'Mid Century',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'mid-century'},expected:['validated','demo-ready','deterministic']};
export function describe_mid_century(){return Object.entries(scenario_mid_century.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_mid_century(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_mid_century.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

