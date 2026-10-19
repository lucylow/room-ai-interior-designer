export interface Scenario_6{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_refunded:Scenario_6={id:'demo_orders_refunded',name:'Refunded',facts:{room:'studio',style:'organic-modern',budget:'2750',currency:'CAD',channel:'refunded'},expected:['validated','demo-ready','deterministic']};
export function describe_refunded(){return Object.entries(scenario_refunded.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_refunded(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_refunded.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

