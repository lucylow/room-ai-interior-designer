import type {Insight,Recommendation,RoomContext} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
export const opportunityInsights=(room:RoomContext,recs:Recommendation[]):Insight[]=>{
 const opportunities=[
  {key:'unused-floor',score:Math.max(0,.72-room.storageScore),title:'Unused organization opportunity',cat:'storage' as const,text:'Some floor capacity may be recoverable through better vertical or closed storage.'},
  {key:'layout-gap',score:Math.max(0,.75-room.circulationScore),title:'Layout refinement opportunity',cat:'layout' as const,text:'The current circulation score leaves room for a clearer primary route.'},
  {key:'light-gap',score:Math.max(0,.74-room.naturalLightScore),title:'Lighting opportunity',cat:'lighting' as const,text:'A layered lighting strategy could improve the room after daylight changes.'},
 ];return opportunities.filter(x=>x.score>.12).map(x=>({id:`opp-${x.key}-${room.roomId}`,severity:x.score>.42?'medium':'low',category:x.cat,title:x.title,summary:x.text,metric:x.score*100,unit:'%',evidence:[makeEvidence('model',x.key,x.score.toFixed(2),room.measurements.confidence)],recommendedNextStep:recs.find(r=>r.category===x.cat)?.title??'Generate alternatives for this category.',confidence:clamp(room.measurements.confidence*.7+.2),createdAt:Date.now()}));
};
