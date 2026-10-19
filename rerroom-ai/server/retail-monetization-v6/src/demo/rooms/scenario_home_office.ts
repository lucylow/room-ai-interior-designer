export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_home_office:Scenario_2={id:'demo_rooms_home_office',name:'Home Office',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'home-office'},expected:['validated','demo-ready','deterministic']};
export function describe_home_office(){return Object.entries(scenario_home_office.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_home_office(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_home_office.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

