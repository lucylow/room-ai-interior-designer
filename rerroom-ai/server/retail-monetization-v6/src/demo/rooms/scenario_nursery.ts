export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_nursery:Scenario_5={id:'demo_rooms_nursery',name:'Nursery',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'nursery'},expected:['validated','demo-ready','deterministic']};
export function describe_nursery(){return Object.entries(scenario_nursery.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_nursery(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_nursery.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

