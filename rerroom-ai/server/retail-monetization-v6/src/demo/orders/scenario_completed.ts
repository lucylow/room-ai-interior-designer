export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_completed:Scenario_4={id:'demo_orders_completed',name:'Completed',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'completed'},expected:['validated','demo-ready','deterministic']};
export function describe_completed(){return Object.entries(scenario_completed.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_completed(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_completed.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

