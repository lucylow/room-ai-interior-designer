
import type {RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeAdvisorResult {id:string;roomType:string;layout:string;focus:string;summary:string;score:number;confidence:number;actions:string[];signals:CreativeSignal[];}
export function adviseentryway_arrival(room:RoomContext):CreativeAdvisorResult{
 const base=room.roomType==='entryway'?1:.72;
 const score=clamp(base*.45+room.circulationScore*.2+room.visualBalanceScore*.18+room.naturalLightScore*.17);
 const confidence=clamp(.56+room.measurements.confidence*.22+(room.roomType==='entryway'?.1:.02));
 const actions=['Preserve source geometry','Show the change in 2D and 3D','Keep existing measurements anchored','Create a clear arrival sequence with one storage/drop zone and mirror focal point.'];
 const signals:CreativeSignal[]=[
  {id:'advisor-entryway-arrival-fit',label:'Room fit',score:clamp(base),confidence,source:'creative-advisor',explanation:'The advisor is specialized for this room/use case.'},
  {id:'advisor-entryway-arrival-flow',label:'Flow',score:clamp(room.circulationScore),confidence:.8,source:'room-state',explanation:'Circulation remains a primary constraint.'},
  {id:'advisor-entryway-arrival-visual',label:'Visual balance',score:clamp(room.visualBalanceScore),confidence:.76,source:'room-state',explanation:'Visual hierarchy is included before rendering.'},
  {id:'advisor-entryway-arrival-focus',label:'Creative focus',score:clamp(.56+score*.4),confidence:.7,source:'creative-rule',explanation:'Create a clear arrival sequence with one storage/drop zone and mirror focal point.'},
 ];
 return {id:'advisor-entryway-arrival',roomType:'entryway',layout:'arrival-zone',focus:'layout',summary:'Create a clear arrival sequence with one storage/drop zone and mirror focal point.',score,confidence,actions,signals};
}
