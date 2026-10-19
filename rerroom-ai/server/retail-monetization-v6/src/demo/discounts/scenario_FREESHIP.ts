export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_FREESHIP:Scenario_3={id:'demo_discounts_FREESHIP',name:'Freeship',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'FREESHIP'},expected:['validated','demo-ready','deterministic']};
export function describe_FREESHIP(){return Object.entries(scenario_FREESHIP.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_FREESHIP(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_FREESHIP.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

