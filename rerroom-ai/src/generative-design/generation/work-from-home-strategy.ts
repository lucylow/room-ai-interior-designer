import type {DesignConcept,RoomContext,DesignIntent} from '../core/types';
import {clamp} from '../core/utils';
export const work_from_homeStrategy=(concept:DesignConcept,room:RoomContext,intent:DesignIntent):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+0.015),confidence:clamp(concept.confidence+0.008)};
 c.conceptText+=` Strategy focus: work from home; ${room.inferredFunctions.slice(0,2).join(' + ')||'everyday living'} remains supported.`;
 c.render={...c.render,notes:[...c.render.notes,'Strategy: work from home']};
 return c;
};
