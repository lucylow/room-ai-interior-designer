import { RGBAFrame, avg, clamp } from '../core/types';
export function pixelDiff(a:RGBAFrame,b:RGBAFrame):number{ if(a.width!==b.width||a.height!==b.height) return 1; const vals:number[]=[]; for(let i=0;i<a.data.length;i+=4){ vals.push((Math.abs(a.data[i]-b.data[i])+Math.abs(a.data[i+1]-b.data[i+1])+Math.abs(a.data[i+2]-b.data[i+2]))/765); } return avg(vals); }
export function similarity(a:RGBAFrame,b:RGBAFrame):number{return clamp(1-pixelDiff(a,b));}
