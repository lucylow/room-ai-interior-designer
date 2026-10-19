export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_living_room:Scenario_0={id:'demo_rooms_living_room',name:'Living Room',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'living-room'},expected:['validated','demo-ready','deterministic']};
export function describe_living_room(){return Object.entries(scenario_living_room.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_living_room(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_living_room.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

