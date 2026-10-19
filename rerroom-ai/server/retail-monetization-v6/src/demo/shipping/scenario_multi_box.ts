export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_multi_box:Scenario_4={id:'demo_shipping_multi_box',name:'Multi Box',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'multi-box'},expected:['validated','demo-ready','deterministic']};
export function describe_multi_box(){return Object.entries(scenario_multi_box.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_multi_box(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_multi_box.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

