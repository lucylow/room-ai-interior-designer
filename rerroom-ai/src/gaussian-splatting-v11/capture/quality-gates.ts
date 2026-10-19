import type { CameraFrame } from '../core/types';

export interface CaptureQualityReport { score:number; usable:boolean; blurRate:number; exposureVariance:number; poseReady:boolean; warnings:string[]; }

export function assessCapture(frames:CameraFrame[]):CaptureQualityReport {
  const warnings:string[]=[]; if(frames.length<8)warnings.push('Capture has fewer than eight frames');
  const blurRate=frames.length?frames.filter(f=>f.motionBlur>0.35||f.sharpness<0.35).length/frames.length:1;
  const exposures=frames.map(f=>f.exposure); const mean=exposures.reduce((a,b)=>a+b,0)/(exposures.length||1); const variance=exposures.reduce((a,b)=>a+(b-mean)**2,0)/(exposures.length||1);
  const poseReady=frames.filter(f=>!!f.pose&&!!f.intrinsics).length>=Math.max(5,Math.floor(frames.length*0.7));
  if(blurRate>0.35)warnings.push('Too many blurred frames'); if(variance>0.2)warnings.push('Exposure varies strongly'); if(!poseReady)warnings.push('Camera poses are incomplete');
  const score=Math.max(0,1-0.45*blurRate-0.4*Math.min(1,variance)-0.3*(poseReady?0:1)); return {score,usable:score>=0.45&&frames.length>=4,blurRate,exposureVariance:variance,poseReady,warnings};
}
