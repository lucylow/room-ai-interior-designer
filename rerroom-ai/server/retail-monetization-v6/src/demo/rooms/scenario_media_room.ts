export interface Scenario_7{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_media_room:Scenario_7={id:'demo_rooms_media_room',name:'Media Room',facts:{room:'media-room',style:'coastal',budget:'3125',currency:'CAD',channel:'media-room'},expected:['validated','demo-ready','deterministic']};
export function describe_media_room(){return Object.entries(scenario_media_room.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_media_room(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_media_room.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

