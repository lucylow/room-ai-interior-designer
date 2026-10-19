export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_entryway:Scenario_4={id:'demo_rooms_entryway',name:'Entryway',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'entryway'},expected:['validated','demo-ready','deterministic']};
export function describe_entryway(){return Object.entries(scenario_entryway.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_entryway(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_entryway.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

