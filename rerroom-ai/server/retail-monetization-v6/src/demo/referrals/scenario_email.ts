export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_email:Scenario_4={id:'demo_referrals_email',name:'Email',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'email'},expected:['validated','demo-ready','deterministic']};
export function describe_email(){return Object.entries(scenario_email.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_email(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_email.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

