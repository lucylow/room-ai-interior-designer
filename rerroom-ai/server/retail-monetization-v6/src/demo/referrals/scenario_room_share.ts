export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_room_share:Scenario_3={id:'demo_referrals_room_share',name:'Room Share',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'room-share'},expected:['validated','demo-ready','deterministic']};
export function describe_room_share(){return Object.entries(scenario_room_share.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_room_share(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_room_share.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

