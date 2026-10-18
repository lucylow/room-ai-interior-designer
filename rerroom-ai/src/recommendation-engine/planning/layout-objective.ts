import type {RoomContext,Scenario} from '../core/types';
import {simulate} from '../engine/simulation';
export interface LayoutObjectiveWeights {circulation:number;overlap:number;openings:number;balance:number;}
export const evaluateLayout=(room:RoomContext,scenario:Scenario,w:LayoutObjectiveWeights)=>{const sim=simulate(room,scenario);const balance=room.visualBalanceScore;return sim.circulation*w.circulation-sim.overlap*w.overlap+(sim.valid?1:0)*w.openings+balance*w.balance;};
export const defaultLayoutWeights:LayoutObjectiveWeights={circulation:.45,overlap:.35,openings:.1,balance:.1};
