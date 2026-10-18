import type {Scenario} from '../core/types';
export interface ScenarioLabel{id:string;title:string;subtitle:string;priority:number;}
export const labelScenarios=(scenarios:Scenario[]):ScenarioLabel[]=>scenarios.map((s,i)=>({id:s.id,title:s.name,subtitle:s.expectedOutcome,priority:Math.max(0,1-i/scenarios.length)}));
