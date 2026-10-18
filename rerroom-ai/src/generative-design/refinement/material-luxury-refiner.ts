import type {DesignConcept} from '../core/types';
import {clamp} from '../core/utils';
export const material_luxuryRefiner=(concept:DesignConcept):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+.012),confidence:clamp(concept.confidence+.005)};
 c.conceptText+=` Refinement: material luxury.`; c.render={...c.render,notes:[...c.render.notes,'Applied refinement: material luxury']};
 return c;
};
