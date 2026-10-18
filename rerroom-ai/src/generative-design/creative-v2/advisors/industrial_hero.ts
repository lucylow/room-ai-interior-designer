
import type {RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeAdvisorResult {id:string;roomType:string;layout:string;focus:string;summary:string;score:number;confidence:number;actions:string[];signals:CreativeSignal[];}
export function adviseindustrial_hero(room:RoomContext):CreativeAdvisorResult{
 const base=room.roomType==='other'?1:.72;
 const score=clamp(base*.45+room.circulationScore*.2+room.visualBalanceScore*.18+room.naturalLightScore*.17);
 const confidence=clamp(.56+room.measurements.confidence*.22+(room.roomType==='other'?.1:.02));
 const actions=['Preserve source geometry','Show the change in 2D and 3D','Keep existing measurements anchored','Use controlled black metal, mineral texture, and one warm wood counterpoint.'];
 const signals:CreativeSignal[]=[
  {id:'advisor-industrial-hero-fit',label:'Room fit',score:clamp(base),confidence,source:'creative-advisor',explanation:'The advisor is specialized for this room/use case.'},
  {id:'advisor-industrial-hero-flow',label:'Flow',score:clamp(room.circulationScore),confidence:.8,source:'room-state',explanation:'Circulation remains a primary constraint.'},
  {id:'advisor-industrial-hero-visual',label:'Visual balance',score:clamp(room.visualBalanceScore),confidence:.76,source:'room-state',explanation:'Visual hierarchy is included before rendering.'},
  {id:'advisor-industrial-hero-focus',label:'Creative focus',score:clamp(.56+score*.4),confidence:.7,source:'creative-rule',explanation:'Use controlled black metal, mineral texture, and one warm wood counterpoint.'},
 ];
 return {id:'advisor-industrial-hero',roomType:'other',layout:'open-flow',focus:'materials',summary:'Use controlled black metal, mineral texture, and one warm wood counterpoint.',score,confidence,actions,signals};
}
