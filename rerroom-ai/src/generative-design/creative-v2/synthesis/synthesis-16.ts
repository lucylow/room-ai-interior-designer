
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface SynthesisProfile {id:string;style:string;palette:string;layout:string;emphasis:string[];avoid:string[];}
export const profile:SynthesisProfile={id:'synth-16',style:'mid-century',palette:'boho-rust',layout:'storage-edge',emphasis:['concentrate wardrobes on one perimeter edge to preserve calm','preserve geometry','show material hierarchy'],avoid:['invented openings','scale drift','unbounded decor']};
export function scoreSynthesis(room:RoomContext):number {
 const style=room.styleSignals[profile.style]??.5; const color=room.colorSignals[profile.palette]??.5; const layout=room.circulationScore;
 return clamp(style*.38+color*.25+layout*.22+room.visualBalanceScore*.15);
}
export function signalsSynthesis(room:RoomContext,concept:DesignConcept):CreativeSignal[] {
 const score=scoreSynthesis(room);
 return [
  {id:`synth-16-style`,label:'Synthesis style fit',score:clamp((room.styleSignals[profile.style]??.5)),confidence:.75,source:'synthesis-profile',explanation:`Uses mid-century as the aesthetic anchor.`},
  {id:`synth-16-palette`,label:'Synthesis palette fit',score:clamp((room.colorSignals[profile.palette]??.5)),confidence:.74,source:'synthesis-profile',explanation:`Uses boho-rust for color guidance.`},
  {id:`synth-16-layout`,label:'Synthesis layout fit',score:clamp(room.circulationScore),confidence:.78,source:'synthesis-profile',explanation:`Uses storage-edge as the layout pattern.`},
  {id:`synth-16-concept`,label:'Synthesis concept alignment',score:clamp(concept.score*.55+score*.45),confidence:.7,source:'synthesis-profile',explanation:'Blends aesthetic and room-state signals.'},
 ];
}
