export interface Scenario_0{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_card_success:Scenario_0={id:'demo_payments_card_success',name:'Card Success',facts:{room:'living-room',style:'modern',budget:'500',currency:'CAD',channel:'card-success'},expected:['validated','demo-ready','deterministic']};
export function describe_card_success(){return Object.entries(scenario_card_success.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_card_success(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_card_success.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

