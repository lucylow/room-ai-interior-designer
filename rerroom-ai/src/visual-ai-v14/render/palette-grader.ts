import { RGBAFrame, Color, avg, clamp } from '../core/types';
export function paletteDistance(frame:RGBAFrame,target:Color):number{ const vals:number[]=[]; for(let i=0;i<frame.data.length;i+=16){ vals.push(Math.hypot(frame.data[i]-target.r,frame.data[i+1]-target.g,frame.data[i+2]-target.b)/441.67); } return avg(vals); }
export function paletteFit(frame:RGBAFrame,target:Color):number{return clamp(1-paletteDistance(frame,target));}
