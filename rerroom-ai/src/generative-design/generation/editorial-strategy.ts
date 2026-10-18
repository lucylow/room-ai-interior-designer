import type {DesignConcept,RoomContext,DesignIntent} from '../core/types';
import {clamp} from '../core/utils';
export const editorialStrategy=(concept:DesignConcept,room:RoomContext,intent:DesignIntent):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+0.01),confidence:clamp(concept.confidence+0.008)};
 c.conceptText+=` Strategy focus: editorial; ${room.inferredFunctions.slice(0,2).join(' + ')||'everyday living'} remains supported.`;
 c.render={...c.render,notes:[...c.render.notes,'Strategy: editorial']};
 return c;
};
