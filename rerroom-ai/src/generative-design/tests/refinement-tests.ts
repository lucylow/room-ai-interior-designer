import {IterativeRefinementEngine} from '../refinement/iterative-refinement-engine';
import {GenerativeOrchestrator} from '../generation/generative-orchestrator';
import {MOCK_ROOM,mockIntent} from '../mock/data';
export const runRefinementTest=async()=>{const result=await new GenerativeOrchestrator().run({intent:mockIntent,room:MOCK_ROOM,candidateCount:6,now:1700000400000});const base=result.concepts[0];const refined=new IterativeRefinementEngine().refine(MOCK_ROOM,mockIntent,base,{conceptId:base.id,action:'refine',createdAt:1700000500000});if(!refined.render.geometryLock)throw new Error('Geometry lock must remain enabled');return refined;};
