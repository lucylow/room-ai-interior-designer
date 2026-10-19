export interface VideoClip { id:string; durationMs:number; fps:number; frames:number; }
export interface TimelineSegment { startMs:number; endMs:number; sampleEveryMs:number; expectedFrames:number; }
export function buildTimeline(clip:VideoClip,segmentMs=4000,sampleFps=4):TimelineSegment[]{const out:TimelineSegment[]=[];for(let s=0;s<clip.durationMs;s+=segmentMs){const e=Math.min(clip.durationMs,s+segmentMs);out.push({startMs:s,endMs:e,sampleEveryMs:1000/sampleFps,expectedFrames:Math.ceil((e-s)/1000*sampleFps)});}return out;}
