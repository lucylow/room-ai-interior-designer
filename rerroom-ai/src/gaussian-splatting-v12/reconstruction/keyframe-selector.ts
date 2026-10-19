import { FrameRecord } from '../core/types';
import { percentile, stableId } from '../core/utils';
export type KeyframeDecision={frameId:string;score:number;reason:string};
export class KeyframeSelector{
  constructor(private readonly minGapMs=250, private readonly targetCount=120){}
  score(frame:FrameRecord):number{
    const sharp=frame.sharpness;
    const blurPenalty=1-frame.blur;
    const exposure=1-Math.abs(frame.exposure-0.5)*2;
    const coverage=frame.coverage;
    const motion=1-Math.min(1,frame.motion);
    return sharp*0.32+blurPenalty*0.18+exposure*0.16+coverage*0.2+motion*0.14;
  }
  select(frames:FrameRecord[]):KeyframeDecision[]{
    const sorted=[...frames].sort((a,b)=>a.timestampMs-b.timestampMs);
    const threshold=percentile(sorted.map(f=>this.score(f)),0.6);
    const selected:KeyframeDecision[]=[]; let last=-Infinity;
    for(const f of sorted){const s=this.score(f); if(s>=threshold && f.timestampMs-last>=this.minGapMs){selected.push({frameId:f.id,score:s,reason:s>0.8?'high-quality':'coverage-diversity'});last=f.timestampMs;if(selected.length>=this.targetCount)break}}
    return selected;
  }
  diversity(selected:KeyframeDecision[],frames:FrameRecord[]):number{
    const ids=new Set(selected.map(s=>s.frameId));
    if(!frames.length)return 0;
    return frames.filter(f=>ids.has(f.id)).length/frames.length;
  }
  manifest(frames:FrameRecord[]){const decisions=this.select(frames);return {id:stableId('kf',frames.map(f=>f.id).join('|')),count:decisions.length,decisions,coverage:this.diversity(decisions,frames)}}
}
