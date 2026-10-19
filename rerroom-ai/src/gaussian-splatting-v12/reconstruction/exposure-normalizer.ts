import { FrameRecord } from '../core/types';
import { clamp, percentile } from '../core/utils';
export type ExposureCorrection={frameId:string;gain:number;offset:number;confidence:number};
export function normalizeExposures(frames:FrameRecord[]):ExposureCorrection[]{if(!frames.length)return[];const mid=percentile(frames.map(f=>f.exposure),.5);return frames.map(f=>{const delta=mid-f.exposure;const gain=clamp(1+delta*.8,.75,1.25);const offset=clamp(delta*.1,-.08,.08);const confidence=1-Math.min(1,Math.abs(delta)*2);return{frameId:f.id,gain,offset,confidence}})}
export function applyExposure(value:number,c:ExposureCorrection){return clamp(value*c.gain+c.offset,0,1)}
export function exposureHealth(frames:FrameRecord[]){const xs=frames.map(f=>f.exposure);const mean=xs.reduce((a,b)=>a+b,0)/(xs.length||1);const variance=xs.reduce((s,x)=>s+(x-mean)**2,0)/(xs.length||1);return {mean,variance,stable:variance<.03}}
