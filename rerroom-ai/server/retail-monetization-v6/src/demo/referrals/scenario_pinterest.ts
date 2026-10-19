export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_pinterest:Scenario_1={id:'demo_referrals_pinterest',name:'Pinterest',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'pinterest'},expected:['validated','demo-ready','deterministic']};
export function describe_pinterest(){return Object.entries(scenario_pinterest.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_pinterest(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_pinterest.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

