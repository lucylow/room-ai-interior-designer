import type {Category,Evidence,Severity} from '../core/types';
export interface Signal {name:string;value:number;baseline?:number;confidence:number;category:Category;evidence:Evidence[];}
export interface InsightCluster {id:string;title:string;insights:string[];priority:number;category:Category;}
export interface TrendPoint {at:number;value:number;label?:string;}
export interface InsightTrend {metric:string;direction:'improving'|'stable'|'declining'|'unknown';slope:number;change:number;confidence:number;points:TrendPoint[];}
export interface InsightSummary {title:string;summary:string;severity:Severity;category:Category;signals:Signal[];nextStep:string;confidence:number;}
