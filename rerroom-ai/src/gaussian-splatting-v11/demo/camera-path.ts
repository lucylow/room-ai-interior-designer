import type { CameraPose } from '../core/types';
import { lookAt } from '../math/camera';
export function demoCameraPath(count=24):CameraPose[]{return Array.from({length:count},(_,i)=>{const t=i/Math.max(1,count-1),a=t*Math.PI*2;return lookAt([Math.cos(a)*4,1.6+0.25*Math.sin(a*2),Math.sin(a)*4],[0,1.2,0]);});}
