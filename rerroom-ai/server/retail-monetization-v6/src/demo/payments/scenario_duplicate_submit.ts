export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_duplicate_submit:Scenario_5={id:'demo_payments_duplicate_submit',name:'Duplicate Submit',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'duplicate-submit'},expected:['validated','demo-ready','deterministic']};
export function describe_duplicate_submit(){return Object.entries(scenario_duplicate_submit.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_duplicate_submit(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_duplicate_submit.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

