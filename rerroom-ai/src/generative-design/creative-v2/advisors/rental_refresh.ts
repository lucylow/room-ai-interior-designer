
import type {RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeAdvisorResult {id:string;roomType:string;layout:string;focus:string;summary:string;score:number;confidence:number;actions:string[];signals:CreativeSignal[];}
export function adviserental_refresh(room:RoomContext):CreativeAdvisorResult{
 const base=room.roomType==='other'?1:.72;
 const score=clamp(base*.45+room.circulationScore*.2+room.visualBalanceScore*.18+room.naturalLightScore*.17);
 const confidence=clamp(.56+room.measurements.confidence*.22+(room.roomType==='other'?.1:.02));
 const actions=['Preserve source geometry','Show the change in 2D and 3D','Keep existing measurements anchored','Favor reversible lighting, textiles, and furniture swaps over permanent work.'];
 const signals:CreativeSignal[]=[
  {id:'advisor-rental-refresh-fit',label:'Room fit',score:clamp(base),confidence,source:'creative-advisor',explanation:'The advisor is specialized for this room/use case.'},
  {id:'advisor-rental-refresh-flow',label:'Flow',score:clamp(room.circulationScore),confidence:.8,source:'room-state',explanation:'Circulation remains a primary constraint.'},
  {id:'advisor-rental-refresh-visual',label:'Visual balance',score:clamp(room.visualBalanceScore),confidence:.76,source:'room-state',explanation:'Visual hierarchy is included before rendering.'},
  {id:'advisor-rental-refresh-focus',label:'Creative focus',score:clamp(.56+score*.4),confidence:.7,source:'creative-rule',explanation:'Favor reversible lighting, textiles, and furniture swaps over permanent work.'},
 ];
 return {id:'advisor-rental-refresh',roomType:'other',layout:'open-flow',focus:'budget',summary:'Favor reversible lighting, textiles, and furniture swaps over permanent work.',score,confidence,actions,signals};
}
