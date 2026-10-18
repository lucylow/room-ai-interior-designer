import type {DesignConcept,RoomContext,DesignIntent} from '../core/types';
import {clamp} from '../core/utils';
export const entertainingStrategy=(concept:DesignConcept,room:RoomContext,intent:DesignIntent):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+0.01),confidence:clamp(concept.confidence+0.012)};
 c.conceptText+=` Strategy focus: entertaining; ${room.inferredFunctions.slice(0,2).join(' + ')||'everyday living'} remains supported.`;
 c.render={...c.render,notes:[...c.render.notes,'Strategy: entertaining']};
 return c;
};
