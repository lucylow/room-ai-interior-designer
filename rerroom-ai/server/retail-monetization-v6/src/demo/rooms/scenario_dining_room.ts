export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_dining_room:Scenario_3={id:'demo_rooms_dining_room',name:'Dining Room',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'dining-room'},expected:['validated','demo-ready','deterministic']};
export function describe_dining_room(){return Object.entries(scenario_dining_room.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_dining_room(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_dining_room.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

