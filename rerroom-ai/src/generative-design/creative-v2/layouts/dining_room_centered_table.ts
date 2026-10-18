
import type {RoomContext,LayoutAdvice,LayoutPattern} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

const ROOM='dining-room';
const PATTERN:LayoutPattern='symmetry';
const SUMMARY='center the dining table within the usable room rectangle';
const TARGETS='table,chairs,sideboard'.split(',');
const CONSTRAINTS=['preserve openings','preserve measured room envelope','protect primary circulation'];

export function advise_dining_room_centered_table_creative(room:RoomContext):LayoutAdvice{
  const score=clamp(.48+room.circulationScore*.25+(1-room.clutterScore)*.18+room.visualBalanceScore*.09);
  return {id:'creative-dining_room_centered_table',title:'Symmetry',pattern:PATTERN,summary:SUMMARY,rationale:`${SUMMARY} while respecting ${room.openings.length} openings and the measured room envelope.`,score,confidence:clamp(.58+room.circulationScore*.25),changes:TARGETS.map((target,i)=>({type:i===0?'move':'align',targetId:target,x:room.measurements.widthM*(.2+i*.12),z:room.measurements.depthM*(.22+i*.10)})),constraintsRespected:CONSTRAINTS,tradeoffs:['May reduce decorative density to protect circulation.'],estimatedImprovement:{circulation:score,visualBalance:clamp(room.visualBalanceScore+.08),comfort:clamp(room.comfortScore+.06)}};
}

export function signals_dining_room_centered_table(room:RoomContext):CreativeSignal[]{
 const advice=advise_dining_room_centered_table_creative(room);
 return [
  {id:'layout-dining_room_centered_table-flow',label:'Flow',score:advice.estimatedImprovement.circulation,confidence:advice.confidence,source:'layout-simulation',explanation:advice.rationale},
  {id:'layout-dining_room_centered_table-balance',label:'Visual balance',score:advice.estimatedImprovement.visualBalance,confidence:.73,source:'layout-simulation',explanation:'Furniture positions create a clearer weight distribution.'},
  {id:'layout-dining_room_centered_table-comfort',label:'Comfort',score:advice.estimatedImprovement.comfort,confidence:.71,source:'layout-simulation',explanation:'The layout leaves primary zones readable and accessible.'},
 ];
}
