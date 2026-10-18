import type {Recommendation,Insight} from '../../core/types';
export interface EvolutionPoint{timestamp:number;score:number;label:string;}
export const buildDesignEvolution=(history:Recommendation[],insights:Insight[]):EvolutionPoint[]=>{const points=[...history.map(r=>({timestamp:r.createdAt,score:r.score,label:r.title})),...insights.map(i=>({timestamp:i.createdAt??Date.now(),score:i.metric??i.confidence,label:i.title}))];return points.sort((a,b)=>a.timestamp-b.timestamp).slice(-30);};
