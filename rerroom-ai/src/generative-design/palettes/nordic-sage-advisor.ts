import {palette} from './nordic-sage';
import type {RoomContext,DesignStyleId} from '../core/types';
export const adviseNordicSage=(room:RoomContext,style:DesignStyleId)=>{
 const daylight=room.naturalLightScore; const warmth=palette.warmth;
 return {palette,fit:Number(((daylight*.25+warmth*.25+room.visualBalanceScore*.2+.3))).toFixed(3),usage:['walls','large furniture','textiles'],guidance:`Use ${palette.name} with ${style} accents; keep the lightest tone on the largest perceived surface and reserve the darkest tone for focal contrast.`};
};
