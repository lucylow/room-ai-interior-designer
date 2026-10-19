import { SplatScene, EditPlan } from '../core/types';
import { hashString } from '../core/types';
export type Refinement={id:string;prompt:string;parent:string;changedIds:string[];createdAt:number;geometryInvariant:boolean};
export class RefinementEngine{private history:Refinement[]=[];apply(scene:SplatScene,plan:EditPlan,prompt:string):SplatScene{const seed=hashString(prompt);const changed=scene.gaussians.filter((_,i)=>(seed+i)%11===0).map(g=>g.id);this.history.push({id:`ref-${seed.toString(16)}`,prompt,parent:scene.sourceRevision,changedIds:changed,createdAt:Date.now(),geometryInvariant:plan.geometryLocked});return{...scene,sourceRevision:`${scene.sourceRevision}:ref-${seed.toString(16)}`}}records(){return this.history.slice()}}
