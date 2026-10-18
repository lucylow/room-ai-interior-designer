import type {DesignConcept} from '../core/types';
import {clamp} from '../core/utils';
export const storageRefiner=(concept:DesignConcept):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+.012),confidence:clamp(concept.confidence+.005)};
 c.conceptText+=` Refinement: storage.`; c.render={...c.render,notes:[...c.render.notes,'Applied refinement: storage']};
 return c;
};
