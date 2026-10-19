import type { CameraFrame, CaptureManifest } from '../core/types';

export interface FrameSamplePolicy { targetFps:number; minSharpness:number; maxMotionBlur:number; maxFrames:number; }

export function sampleFrames(frames:CameraFrame[],policy:FrameSamplePolicy):CameraFrame[] {
  const ordered=[...frames].sort((a,b)=>a.timestampMs-b.timestampMs); const selected:CameraFrame[]=[]; let last=-Infinity; const minDelta=1000/Math.max(policy.targetFps,0.1);
  for(const frame of ordered){if(frame.sharpness<policy.minSharpness||frame.motionBlur>policy.maxMotionBlur)continue; if(frame.timestampMs-last<minDelta)continue; selected.push(frame);last=frame.timestampMs;if(selected.length>=policy.maxFrames)break;}
  return selected;
}
export function estimateCoverage(frames:CameraFrame[]):number { if(frames.length<2)return frames.length?0.2:0; const span=frames[frames.length-1].timestampMs-frames[0].timestampMs; return Math.min(1,Math.log10(span/1000+1)/2); }
export function manifestWithSample(manifest:CaptureManifest,sampled:CameraFrame[]):CaptureManifest{return {...manifest,frames:sampled};}
