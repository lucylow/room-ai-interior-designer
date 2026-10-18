import type {Recommendation} from '../core/types';import {clamp} from '../core/math';
export interface SeasonalFactor {season:'spring'|'summer'|'fall'|'winter';daylightFactor:number;hostingFactor:number;maintenanceFactor:number;}
export const seasons:SeasonalFactor[]=[{season:'spring',daylightFactor:.82,hostingFactor:.72,maintenanceFactor:.7},{season:'summer',daylightFactor:1,hostingFactor:.86,maintenanceFactor:.82},{season:'fall',daylightFactor:.62,hostingFactor:.92,maintenanceFactor:.76},{season:'winter',daylightFactor:.4,hostingFactor:.68,maintenanceFactor:.9}];
export const seasonAdjust=(r:Recommendation,season:SeasonalFactor):Recommendation=>({...r,score:clamp(r.score*(.8+season.daylightFactor*.12+season.hostingFactor*.08)),tags:[...r.tags,season.season]});
export const seasonalRank=(rs:Recommendation[],seasonName:SeasonalFactor['season'])=>{const s=seasons.find(x=>x.season===seasonName)??seasons[0];return rs.map(r=>seasonAdjust(r,s)).sort((a,b)=>b.score-a.score);};
