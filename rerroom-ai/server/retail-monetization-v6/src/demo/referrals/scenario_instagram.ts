export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_instagram:Scenario_0={id:'demo_referrals_instagram',name:'Instagram',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'instagram'},expected:['validated','demo-ready','deterministic']};
export function describe_instagram(){return Object.entries(scenario_instagram.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_instagram(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_instagram.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

