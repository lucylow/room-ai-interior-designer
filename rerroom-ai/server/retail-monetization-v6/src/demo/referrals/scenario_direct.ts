export interface Scenario_5{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_direct:Scenario_5={id:'demo_referrals_direct',name:'Direct',facts:{room:'nursery',style:'mid-century',budget:'2375',currency:'CAD',channel:'direct'},expected:['validated','demo-ready','deterministic']};
export function describe_direct(){return Object.entries(scenario_direct.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_direct(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_direct.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

