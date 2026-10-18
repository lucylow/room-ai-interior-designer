import type {RoomContext,Recommendation,Insight} from '../core/types';
import {buildAIDigest} from '../insights/compound/ai-digest';
import {nextBestActions} from '../insights/compound/next-best-action';
export const buildDigestEngine=(room:RoomContext,recs:Recommendation[],insights:Insight[])=>({digest:buildAIDigest(room,recs,insights),nextActions:nextBestActions(recs,insights)});
