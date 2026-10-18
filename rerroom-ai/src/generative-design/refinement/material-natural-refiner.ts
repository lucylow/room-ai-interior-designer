import type {DesignConcept} from '../core/types';
import {clamp} from '../core/utils';
export const material_naturalRefiner=(concept:DesignConcept):DesignConcept=>{
 const c={...concept,score:clamp(concept.score+.012),confidence:clamp(concept.confidence+.005)};
 c.conceptText+=` Refinement: material natural.`; c.render={...c.render,notes:[...c.render.notes,'Applied refinement: material natural']};
 return c;
};
