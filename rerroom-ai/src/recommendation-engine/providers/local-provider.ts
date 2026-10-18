import type {RecommendationRequest,RecommendationSet} from '../core/types';
import type {RecommendationProvider} from './types';
import {runPipeline} from '../engine/pipeline';import {defaultPolicy} from '../policy/recommendation-policy';
export class LocalRecommendationProvider implements RecommendationProvider {readonly id='local-deterministic';readonly version='2.0.0';async generate(request:RecommendationRequest):Promise<RecommendationSet>{return runPipeline(request,defaultPolicy);}async healthy(){return true;}}
