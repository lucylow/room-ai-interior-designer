export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_ship_national:Scenario_1={id:'demo_shipping_ship_national',name:'Ship National',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'ship-national'},expected:['validated','demo-ready','deterministic']};
export function describe_ship_national(){return Object.entries(scenario_ship_national.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_ship_national(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_ship_national.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

