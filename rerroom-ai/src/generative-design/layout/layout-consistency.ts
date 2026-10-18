import type {RoomContext,LayoutAdvice} from '../core/types';
import {clamp} from '../core/utils';
export const checkLayoutConsistency=(room:RoomContext,layout:LayoutAdvice)=>{
 const invalid=layout.changes.filter(c=>c.targetId&&room.objects.some(o=>o.id===c.targetId&&o.locked));
 const doorRisk=layout.changes.some(c=>c.x!==undefined&&room.openings.some(o=>Math.abs((c.x??0)-o.x)<Math.max(0.5,o.width)));
 const score=clamp(1-invalid.length*.35-(doorRisk?.3:0));
 return {score,invalidTargetIds:invalid.map(x=>x.targetId!).filter(Boolean),doorRisk,warnings:[...(invalid.length?['Locked objects cannot be moved.']:[]),...(doorRisk?['A proposed move may approach an opening.']:[])]};
};
