import type { CaptureManifest } from '../core/types';

export interface ScrubbedCapture extends CaptureManifest { privacy: CaptureManifest['privacy'] & { gpsRemoved:boolean; filenamesNormalized:boolean; faceBlurRequired:boolean; } }

export function scrubCapture(manifest:CaptureManifest):ScrubbedCapture {
  return {...manifest,frames:manifest.frames.map((f,i)=>({...f,fileName:`frame_${String(i+1).padStart(5,'0')}.jpg`})),privacy:{...manifest.privacy,strippedMetadata:true,faceBlurred:true,gpsRemoved:true,filenamesNormalized:true,faceBlurRequired:false}};
}
