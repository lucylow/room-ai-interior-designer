import type {RecommendationRequest} from '../core/types';
const normalize=(value:string)=>value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,' ');
export const recommendationSemanticKey=(request:RecommendationRequest):string=>{const room=request.room;const prefs=request.preferences;return [room.roomId,room.roomType,room.measurements.widthM.toFixed(2),room.measurements.depthM.toFixed(2),prefs.preferredStyles.map(normalize).sort().join(','),prefs.preferredColors.map(normalize).sort().join(','),prefs.priorities.map(normalize).sort().join(','),normalize(request.userPrompt??'')].join('|');};
export const compactSemanticKey=(key:string,max=160)=>key.slice(0,max);
