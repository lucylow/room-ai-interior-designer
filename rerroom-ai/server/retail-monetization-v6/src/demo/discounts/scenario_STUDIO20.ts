export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_STUDIO20:Scenario_2={id:'demo_discounts_STUDIO20',name:'Studio20',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'STUDIO20'},expected:['validated','demo-ready','deterministic']};
export function describe_STUDIO20(){return Object.entries(scenario_STUDIO20.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_STUDIO20(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_STUDIO20.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

