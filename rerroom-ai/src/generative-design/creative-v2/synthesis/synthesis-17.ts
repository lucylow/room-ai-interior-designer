
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface SynthesisProfile {id:string;style:string;palette:string;layout:string;emphasis:string[];avoid:string[];}
export const profile:SynthesisProfile={id:'synth-17',style:'bohemian',palette:'clay-sage',layout:'work-triangle',emphasis:['preserve a readable preparation/cooking/cleanup sequence','preserve geometry','show material hierarchy'],avoid:['invented openings','scale drift','unbounded decor']};
export function scoreSynthesis(room:RoomContext):number {
 const style=room.styleSignals[profile.style]??.5; const color=room.colorSignals[profile.palette]??.5; const layout=room.circulationScore;
 return clamp(style*.38+color*.25+layout*.22+room.visualBalanceScore*.15);
}
export function signalsSynthesis(room:RoomContext,concept:DesignConcept):CreativeSignal[] {
 const score=scoreSynthesis(room);
 return [
  {id:`synth-17-style`,label:'Synthesis style fit',score:clamp((room.styleSignals[profile.style]??.5)),confidence:.75,source:'synthesis-profile',explanation:`Uses bohemian as the aesthetic anchor.`},
  {id:`synth-17-palette`,label:'Synthesis palette fit',score:clamp((room.colorSignals[profile.palette]??.5)),confidence:.74,source:'synthesis-profile',explanation:`Uses clay-sage for color guidance.`},
  {id:`synth-17-layout`,label:'Synthesis layout fit',score:clamp(room.circulationScore),confidence:.78,source:'synthesis-profile',explanation:`Uses work-triangle as the layout pattern.`},
  {id:`synth-17-concept`,label:'Synthesis concept alignment',score:clamp(concept.score*.55+score*.45),confidence:.7,source:'synthesis-profile',explanation:'Blends aesthetic and room-state signals.'},
 ];
}
