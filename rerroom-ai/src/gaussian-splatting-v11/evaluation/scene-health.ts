import type { GaussianScene } from '../core/types';
export interface HealthReport {healthy:boolean;score:number;warnings:string[];}
export function assessSceneHealth(scene:GaussianScene):HealthReport{const warnings:string[]=[];if(scene.splats.length<200)warnings.push('Low splat count for a room reconstruction');if(scene.quality.floaters>0.08)warnings.push('Floater ratio is elevated');if(scene.quality.holes>0.1)warnings.push('Hole ratio is elevated');const score=Math.max(0,scene.quality.score-warnings.length*0.1);return {healthy:score>=0.7,score,warnings};}
