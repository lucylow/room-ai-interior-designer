export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_ROOMSET15:Scenario_1={id:'demo_discounts_ROOMSET15',name:'Roomset15',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'ROOMSET15'},expected:['validated','demo-ready','deterministic']};
export function describe_ROOMSET15(){return Object.entries(scenario_ROOMSET15.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_ROOMSET15(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_ROOMSET15.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

