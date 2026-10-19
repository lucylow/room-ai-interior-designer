export interface Scenario_3{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_platform_payment:Scenario_3={id:'demo_checkout_platform_payment',name:'Platform Payment',facts:{room:'dining-room',style:'industrial',budget:'1625',currency:'CAD',channel:'platform-payment'},expected:['validated','demo-ready','deterministic']};
export function describe_platform_payment(){return Object.entries(scenario_platform_payment.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_platform_payment(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_platform_payment.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

