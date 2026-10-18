import type {Recommendation,Action,RoomContext} from '../core/types';
export interface VisualizationPatch {recommendationId:string;actions:Action[];previewOnly:true;focusObjectIds:string[];cameraHint:'top'|'perspective'|'object-focus';}
export const recommendationToVisualizationPatch=(room:RoomContext,r:Recommendation):VisualizationPatch=>{const focus=[...new Set(r.actions.map(a=>a.targetId).filter((x):x is string=>Boolean(x)))];const cameraHint=r.category==='layout'?'top':focus.length?'object-focus':'perspective';return {recommendationId:r.id,actions:r.actions,previewOnly:true,focusObjectIds:focus,cameraHint};};
export const buildPreviewQueue=(room:RoomContext,rows:Recommendation[],limit=6)=>rows.slice(0,limit).map(r=>recommendationToVisualizationPatch(room,r));
