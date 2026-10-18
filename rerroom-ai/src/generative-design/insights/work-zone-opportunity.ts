import type {RoomContext,DesignConcept,DesignInsight} from '../core/types';
import {clamp} from '../core/utils';
export const work_zone_opportunityInsight=(room:RoomContext,concept?:DesignConcept):DesignInsight=>{
 const metric=concept?.score??(room.visualBalanceScore+room.circulationScore)/2;
 return {id:'insight-work-zone-opportunity',kind:'layout',title:'Work Zone Opportunity',summary:`The AI sees a ${(metric*100).toFixed(0)}% opportunity signal around work zone opportunity for ${room.name}.`,confidence:clamp(.55+room.measurements.confidence*.3),evidence:[`Room measurement confidence ${room.measurements.confidence.toFixed(2)}`,`Visual balance ${room.visualBalanceScore.toFixed(2)}`],actions:['Preview this in 2D and 3D before applying','Keep source geometry locked'],metric,unit:'score'};
};
