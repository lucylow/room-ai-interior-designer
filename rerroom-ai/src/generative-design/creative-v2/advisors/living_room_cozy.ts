
import type {RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeAdvisorResult {id:string;roomType:string;layout:string;focus:string;summary:string;score:number;confidence:number;actions:string[];signals:CreativeSignal[];}
export function adviseliving_room_cozy(room:RoomContext):CreativeAdvisorResult{
 const base=room.roomType==='living-room'?1:.72;
 const score=clamp(base*.45+room.circulationScore*.2+room.visualBalanceScore*.18+room.naturalLightScore*.17);
 const confidence=clamp(.56+room.measurements.confidence*.22+(room.roomType==='living-room'?.1:.02));
 const actions=['Preserve source geometry','Show the change in 2D and 3D','Keep existing measurements anchored','Add layered textiles, a grounded rug, and softer lighting while preserving circulation.'];
 const signals:CreativeSignal[]=[
  {id:'advisor-living-room-cozy-fit',label:'Room fit',score:clamp(base),confidence,source:'creative-advisor',explanation:'The advisor is specialized for this room/use case.'},
  {id:'advisor-living-room-cozy-flow',label:'Flow',score:clamp(room.circulationScore),confidence:.8,source:'room-state',explanation:'Circulation remains a primary constraint.'},
  {id:'advisor-living-room-cozy-visual',label:'Visual balance',score:clamp(room.visualBalanceScore),confidence:.76,source:'room-state',explanation:'Visual hierarchy is included before rendering.'},
  {id:'advisor-living-room-cozy-focus',label:'Creative focus',score:clamp(.56+score*.4),confidence:.7,source:'creative-rule',explanation:'Add layered textiles, a grounded rug, and softer lighting while preserving circulation.'},
 ];
 return {id:'advisor-living-room-cozy',roomType:'living-room',layout:'conversation',focus:'comfort',summary:'Add layered textiles, a grounded rug, and softer lighting while preserving circulation.',score,confidence,actions,signals};
}
