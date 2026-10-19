export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_card_decline:Scenario_1={id:'demo_payments_card_decline',name:'Card Decline',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'card-decline'},expected:['validated','demo-ready','deterministic']};
export function describe_card_decline(){return Object.entries(scenario_card_decline.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_card_decline(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_card_decline.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

