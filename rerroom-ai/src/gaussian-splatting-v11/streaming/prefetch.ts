import type { StreamChunk } from '../core/types';
export interface ViewPrediction {cameraId:string;nextCameraId:string;confidence:number;}
export function rankPrefetch(chunks:StreamChunk[],prediction:ViewPrediction):StreamChunk[]{const bias=prediction.confidence*0.3;return [...chunks].map(c=>({...c,priority:Math.min(1,c.priority+bias)})).sort((a,b)=>b.priority-a.priority);}
