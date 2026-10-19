export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_bedroom:Scenario_1={id:'demo_rooms_bedroom',name:'Bedroom',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'bedroom'},expected:['validated','demo-ready','deterministic']};
export function describe_bedroom(){return Object.entries(scenario_bedroom.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_bedroom(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_bedroom.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

