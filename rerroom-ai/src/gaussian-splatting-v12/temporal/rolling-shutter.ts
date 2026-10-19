import { CameraPose } from '../core/types';
import { lerp } from '../core/types';
export type RollingShutterProfile={readoutMs:number;direction:'top-down'|'bottom-up'|'left-right'|'right-left'};
export function rowTime(y:number,height:number,p:RollingShutterProfile){const t=height<=1?0:y/(height-1);const s=p.direction==='bottom-up'?1-t:p.direction==='right-left'?1-t:t;return s*p.readoutMs}
export function interpolatePose(a:CameraPose,b:CameraPose,t:number):CameraPose{return {...a,position:{x:lerp(a.position.x,b.position.x,t),y:lerp(a.position.y,b.position.y,t),z:lerp(a.position.z,b.position.z,t)},fx:lerp(a.fx,b.fx,t),fy:lerp(a.fy,b.fy,t),cx:lerp(a.cx,b.cx,t),cy:lerp(a.cy,b.cy,t)}}
export function correctionProfile(a:CameraPose,b:CameraPose,p:RollingShutterProfile){return Array.from({length:9},(_,i)=>{const t=rowTime(i,8,p)/p.readoutMs;return {t,pose:interpolatePose(a,b,t)}})}
