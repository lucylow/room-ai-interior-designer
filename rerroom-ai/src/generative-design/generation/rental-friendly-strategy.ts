import type {DesignConcept,RoomContext,DesignIntent} from '../core/types';
import {clamp} from '../core/utils';
export const rental_friendlyStrategy=(concept:DesignConcept,room:RoomContext,_intent:DesignIntent):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+0.015),confidence:clamp(concept.confidence+0.008)};
 c.conceptText+=` Strategy focus: rental friendly; ${room.inferredFunctions.slice(0,2).join(' + ')||'everyday living'} remains supported.`;
 c.render={...c.render,notes:[...c.render.notes,'Strategy: rental friendly']};
 return c;
};
