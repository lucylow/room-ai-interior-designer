export interface Scenario_6{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_studio:Scenario_6={id:'demo_rooms_studio',name:'Studio',facts:{room:'studio',style:'organic-modern',budget:'2750',currency:'CAD',channel:'studio'},expected:['validated','demo-ready','deterministic']};
export function describe_studio(){return Object.entries(scenario_studio.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_studio(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_studio.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

