import type {GenerationRequest,GenerationResult,DesignConcept,DesignFeedback} from '../core/types';
import {GenerativeDesignEngine} from './generative-design-engine';
import {VariantGenerator} from './variant-generator';
export class GenerativeOrchestrator{
 constructor(private engine=new GenerativeDesignEngine()){}
 async run(request:GenerationRequest):Promise<GenerationResult>{
  const result=await this.engine.generate(request); if(!result.concepts.length)return result;
  const variants=new VariantGenerator().from(result.concepts[0],request.room,request.intent,Math.min(4,request.candidateCount??4));
  const merged=[...result.concepts,...variants.map(v=>v.concept)];
  return {...result,concepts:merged.slice(0,request.candidateCount??12),metrics:{...result.metrics,variantsGenerated:variants.length}};
 }
 async refine(request:GenerationRequest,concept:DesignConcept,feedback:DesignFeedback){return this.engine.generate({...request,previousConcept:concept,feedback:[feedback],candidateCount:6});}
}
