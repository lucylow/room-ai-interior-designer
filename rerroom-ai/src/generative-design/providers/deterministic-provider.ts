import type {GenerationRequest,GenerationResult} from '../core/types';
import {GenerativeOrchestrator} from '../generation/generative-orchestrator';
export interface GenerativeProvider{id:string;version:string;generate(request:GenerationRequest):Promise<GenerationResult>;}
export class DeterministicGenerativeProvider implements GenerativeProvider{readonly id='local-generative-demo';readonly version='1.0.0';constructor(private engine=new GenerativeOrchestrator()){} generate(r:GenerationRequest){return this.engine.run(r);}}
