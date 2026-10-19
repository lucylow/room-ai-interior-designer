export interface Scenario_1{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_scandi_to_japandi:Scenario_1={id:'demo_revisions_scandi_to_japandi',name:'Scandi To Japandi',facts:{room:'bedroom',style:'minimalist',budget:'875',currency:'CAD',channel:'scandi-to-japandi'},expected:['validated','demo-ready','deterministic']};
export function describe_scandi_to_japandi(){return Object.entries(scenario_scandi_to_japandi.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_scandi_to_japandi(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_scandi_to_japandi.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

