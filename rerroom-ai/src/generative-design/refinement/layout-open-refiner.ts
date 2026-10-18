import type {DesignConcept} from '../core/types';
import {clamp} from '../core/utils';
export const layout_openRefiner=(concept:DesignConcept):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+.012),confidence:clamp(concept.confidence+.005)};
 c.conceptText+=` Refinement: layout open.`; c.render={...c.render,notes:[...c.render.notes,'Applied refinement: layout open']};
 return c;
};
