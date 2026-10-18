
import type {RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeAdvisorResult {id:string;roomType:string;layout:string;focus:string;summary:string;score:number;confidence:number;actions:string[];signals:CreativeSignal[];}
export function advisestudio_flexible(room:RoomContext):CreativeAdvisorResult{
 const base=room.roomType==='studio'?1:.72;
 const score=clamp(base*.45+room.circulationScore*.2+room.visualBalanceScore*.18+room.naturalLightScore*.17);
 const confidence=clamp(.56+room.measurements.confidence*.22+(room.roomType==='studio'?.1:.02));
 const actions=['Preserve source geometry','Show the change in 2D and 3D','Keep existing measurements anchored','Keep the center open and make furnishings multi-purpose and movable.'];
 const signals:CreativeSignal[]=[
  {id:'advisor-studio-flexible-fit',label:'Room fit',score:clamp(base),confidence,source:'creative-advisor',explanation:'The advisor is specialized for this room/use case.'},
  {id:'advisor-studio-flexible-flow',label:'Flow',score:clamp(room.circulationScore),confidence:.8,source:'room-state',explanation:'Circulation remains a primary constraint.'},
  {id:'advisor-studio-flexible-visual',label:'Visual balance',score:clamp(room.visualBalanceScore),confidence:.76,source:'room-state',explanation:'Visual hierarchy is included before rendering.'},
  {id:'advisor-studio-flexible-focus',label:'Creative focus',score:clamp(.56+score*.4),confidence:.7,source:'creative-rule',explanation:'Keep the center open and make furnishings multi-purpose and movable.'},
 ];
 return {id:'advisor-studio-flexible',roomType:'studio',layout:'flex-grid',focus:'layout',summary:'Keep the center open and make furnishings multi-purpose and movable.',score,confidence,actions,signals};
}
