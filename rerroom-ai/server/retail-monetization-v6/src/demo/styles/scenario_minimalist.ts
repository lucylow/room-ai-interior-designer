export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_minimalist:Scenario_1={id:'demo_styles_minimalist',name:'Minimalist',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'minimalist'},expected:['validated','demo-ready','deterministic']};
export function describe_minimalist(){return Object.entries(scenario_minimalist.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_minimalist(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_minimalist.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

