export interface Scenario_7{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_failed:Scenario_7={id:'demo_orders_failed',name:'Failed',facts:{room:'media-room',style:'coastal',budget:'3125',currency:'CAD',channel:'failed'},expected:['validated','demo-ready','deterministic']};
export function describe_failed(){return Object.entries(scenario_failed.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_failed(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_failed.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

