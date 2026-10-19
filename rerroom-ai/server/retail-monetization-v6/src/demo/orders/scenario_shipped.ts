export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_shipped:Scenario_2={id:'demo_orders_shipped',name:'Shipped',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'shipped'},expected:['validated','demo-ready','deterministic']};
export function describe_shipped(){return Object.entries(scenario_shipped.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_shipped(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_shipped.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

