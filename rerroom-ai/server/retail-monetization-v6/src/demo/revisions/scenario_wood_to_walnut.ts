export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_wood_to_walnut:Scenario_5={id:'demo_revisions_wood_to_walnut',name:'Wood To Walnut',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'wood-to-walnut'},expected:['validated','demo-ready','deterministic']};
export function describe_wood_to_walnut(){return Object.entries(scenario_wood_to_walnut.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_wood_to_walnut(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_wood_to_walnut.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

