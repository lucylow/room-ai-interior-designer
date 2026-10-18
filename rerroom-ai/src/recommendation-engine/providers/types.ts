import type {RecommendationRequest,RecommendationSet} from '../core/types';
export interface RecommendationProvider {id:string;version:string;generate(request:RecommendationRequest):Promise<RecommendationSet>;healthy?():Promise<boolean>;}
