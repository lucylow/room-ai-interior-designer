export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_retailer_handoff:Scenario_2={id:'demo_checkout_retailer_handoff',name:'Retailer Handoff',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'retailer-handoff'},expected:['validated','demo-ready','deterministic']};
export function describe_retailer_handoff(){return Object.entries(scenario_retailer_handoff.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_retailer_handoff(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_retailer_handoff.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

