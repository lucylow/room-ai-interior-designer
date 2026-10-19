export interface Scenario_4{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_japandi:Scenario_4={id:'demo_styles_japandi',name:'Japandi',facts:{room:'entryway',style:'japandi',budget:'2000',currency:'CAD',channel:'japandi'},expected:['validated','demo-ready','deterministic']};
export function describe_japandi(){return Object.entries(scenario_japandi.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_japandi(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_japandi.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

