export interface Scenario_2{id:string;name:string;facts:Record<string,string>;expected:string[]}
export const scenario_wallet_success:Scenario_2={id:'demo_payments_wallet_success',name:'Wallet Success',facts:{room:'home-office',style:'scandinavian',budget:'1250',currency:'CAD',channel:'wallet-success'},expected:['validated','demo-ready','deterministic']};
export function describe_wallet_success(){return Object.entries(scenario_wallet_success.facts).map(([k,v])=>`${k}=${v}`).join(' | ')}
export function assert_wallet_success(facts:Record<string,string>){for(const [k,v] of Object.entries(scenario_wallet_success.facts))if(facts[k]!==v)throw new Error(`scenario_mismatch:${k}`);return true}

