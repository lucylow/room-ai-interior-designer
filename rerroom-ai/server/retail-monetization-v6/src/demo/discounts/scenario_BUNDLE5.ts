export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_BUNDLE5:Scenario_4={id:'demo_discounts_BUNDLE5',name:'Bundle5',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'BUNDLE5'},expected:['validated','demo-ready','deterministic']};
export function describe_BUNDLE5(){return Object.entries(scenario_BUNDLE5.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_BUNDLE5(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_BUNDLE5.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

