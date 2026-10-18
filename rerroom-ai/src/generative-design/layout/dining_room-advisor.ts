import type {RoomContext,UserPreferences,LayoutAdvice,LayoutPattern} from '../core/types';
import {clamp} from '../core/utils';
const patterns:LayoutPattern[]=['symmetry', 'conversation', 'open-flow'];
export const adviseDiningRoom=(room:RoomContext,prefs:UserPreferences):LayoutAdvice[]=>{
  const clear=room.measurements.widthM*room.measurements.depthM;
  const baseScore=clamp(.45+room.circulationScore*.3+room.visualBalanceScore*.15+(1-room.clutterScore)*.1);
  return patterns.map((pattern,i)=>{
    const gain=clamp(baseScore-i*.035+(prefs.priorities.includes('layout') ? .06 : 0));
    const changes=room.objects.slice(0,Math.min(3,room.objects.length)).map((o,j)=>({type:(j===0?'move':'align') as 'move'|'align',targetId:o.id,x:clamp(o.position.x+((i%2)?-.18:.16),.25,room.measurements.widthM-.25),z:clamp(o.position.z+((j%2) ? .12 : -.1),.25,room.measurements.depthM-.25)}));
    return {id:`dining_room-layout-${i+1}`,title:`Dining Room ${pattern.replace('-', ' ')}`,pattern,summary:`Use a ${pattern.replace('-', ' ')} arrangement to support ${room.inferredFunctions.slice(0,2).join(' and ')||'everyday use'}.`,rationale:`The plan reserves open circulation while improving visual balance in a ${clear.toFixed(1)} m² room.`,score:gain,confidence:room.measurements.confidence,changes,constraintsRespected:room.constraints,tradeoffs:['May require a small furniture shift','Exact placement should be previewed in 2D/3D'],estimatedImprovement:{circulation:clamp(room.circulationScore+gain*.12)-room.circulationScore,visualBalance:clamp(room.visualBalanceScore+gain*.1)-room.visualBalanceScore}};
  });
};
