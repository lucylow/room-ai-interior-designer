export interface Scenario_8{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_quiet_luxury:Scenario_8={id:'demo_styles_quiet_luxury',name:'Quiet Luxury',facts:{room:'living-room',style:'quiet-luxury',budget:'3500',currency:'CAD',channel:'quiet-luxury'},expected:['validated','demo-ready','deterministic']};
export function describe_quiet_luxury(){return Object.entries(scenario_quiet_luxury.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_quiet_luxury(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_quiet_luxury.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

