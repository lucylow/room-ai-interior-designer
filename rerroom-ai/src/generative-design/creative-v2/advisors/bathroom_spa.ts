
import type {RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeAdvisorResult {id:string;roomType:string;layout:string;focus:string;summary:string;score:number;confidence:number;actions:string[];signals:CreativeSignal[];}
export function advisebathroom_spa(room:RoomContext):CreativeAdvisorResult{
 const base=room.roomType==='bathroom'?1:.72;
 const score=clamp(base*.45+room.circulationScore*.2+room.visualBalanceScore*.18+room.naturalLightScore*.17);
 const confidence=clamp(.56+room.measurements.confidence*.22+(room.roomType==='bathroom'?.1:.02));
 const actions=['Preserve source geometry','Show the change in 2D and 3D','Keep existing measurements anchored','Use calm stone, warm indirect light, and texture contrast between wet and dry zones.'];
 const signals:CreativeSignal[]=[
  {id:'advisor-bathroom-spa-fit',label:'Room fit',score:clamp(base),confidence,source:'creative-advisor',explanation:'The advisor is specialized for this room/use case.'},
  {id:'advisor-bathroom-spa-flow',label:'Flow',score:clamp(room.circulationScore),confidence:.8,source:'room-state',explanation:'Circulation remains a primary constraint.'},
  {id:'advisor-bathroom-spa-visual',label:'Visual balance',score:clamp(room.visualBalanceScore),confidence:.76,source:'room-state',explanation:'Visual hierarchy is included before rendering.'},
  {id:'advisor-bathroom-spa-focus',label:'Creative focus',score:clamp(.56+score*.4),confidence:.7,source:'creative-rule',explanation:'Use calm stone, warm indirect light, and texture contrast between wet and dry zones.'},
 ];
 return {id:'advisor-bathroom-spa',roomType:'bathroom',layout:'wet-dry',focus:'materials',summary:'Use calm stone, warm indirect light, and texture contrast between wet and dry zones.',score,confidence,actions,signals};
}
