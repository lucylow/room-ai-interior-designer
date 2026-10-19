export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_timeout:Scenario_4={id:'demo_payments_timeout',name:'Timeout',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'timeout'},expected:['validated','demo-ready','deterministic']};
export function describe_timeout(){return Object.entries(scenario_timeout.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_timeout(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_timeout.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

