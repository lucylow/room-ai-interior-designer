export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_DESIGNER10:Scenario_5={id:'demo_discounts_DESIGNER10',name:'Designer10',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'DESIGNER10'},expected:['validated','demo-ready','deterministic']};
export function describe_DESIGNER10(){return Object.entries(scenario_DESIGNER10.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_DESIGNER10(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_DESIGNER10.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

