import type {RoomContext,UserPreferences,BudgetProfile,Goal,FeatureVector,Evidence} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
export interface SignalBundle {name:string;value:number;confidence:number;category:string;evidence:Evidence[];}
export interface AnalysisContext {room:RoomContext;preferences:UserPreferences;budget?:BudgetProfile;goals:Goal[];features:FeatureVector;signals:SignalBundle[];promptTokens:string[];}
export const buildContext=(room:RoomContext,prefs:UserPreferences,budget:BudgetProfile|undefined,goals:Goal[],features:FeatureVector,signals:SignalBundle[],promptTokens:string[]):AnalysisContext=>({room,preferences:prefs,budget,goals,features,signals,promptTokens});
export const contextEvidence=(ctx:AnalysisContext):Evidence[]=>[
  makeEvidence('measurement','room dimensions',`${ctx.room.measurements.widthM.toFixed(1)}×${ctx.room.measurements.depthM.toFixed(1)}m`,ctx.room.measurements.confidence),
  makeEvidence('preference','priorities',ctx.preferences.priorities.slice(0,4).join(', ')||'none',.9),
  makeEvidence('model','feature count',String(ctx.features.values.length),clamp(.6+ctx.features.values.length/100)),
];
