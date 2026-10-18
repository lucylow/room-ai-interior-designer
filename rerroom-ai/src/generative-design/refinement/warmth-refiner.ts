import type {DesignConcept} from '../core/types';
import {clamp} from '../core/utils';
export const warmthRefiner=(concept:DesignConcept):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+.012),confidence:clamp(concept.confidence+.005)};
 c.conceptText+=` Refinement: warmth.`; c.render={...c.render,notes:[...c.render.notes,'Applied refinement: warmth']};
 return c;
};
