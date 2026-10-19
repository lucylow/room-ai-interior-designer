export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_processing:Scenario_1={id:'demo_orders_processing',name:'Processing',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'processing'},expected:['validated','demo-ready','deterministic']};
export function describe_processing(){return Object.entries(scenario_processing.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_processing(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_processing.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

