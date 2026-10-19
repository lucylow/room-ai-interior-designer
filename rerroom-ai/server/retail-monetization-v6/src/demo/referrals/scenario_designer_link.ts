export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_designer_link:Scenario_2={id:'demo_referrals_designer_link',name:'Designer Link',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'designer-link'},expected:['validated','demo-ready','deterministic']};
export function describe_designer_link(){return Object.entries(scenario_designer_link.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_designer_link(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_designer_link.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

