import { VisualMetrics, clamp } from '../core/types';
export function scoreVisual(m:VisualMetrics):number{ return clamp(m.sharpness*.15+m.composition*.15+m.geometry*.2+m.lighting*.15+m.material*.15+m.consistency*.2); }
export function visualMetrics(seed:number):VisualMetrics{ const f=(n:number)=>clamp(.6+(((seed*n)%31)/100)); return {sharpness:f(3),composition:f(5),geometry:f(7),lighting:f(11),material:f(13),consistency:f(17),overall:0}; }
export function finalizeVisualMetrics(m:VisualMetrics):VisualMetrics{ return {...m,overall:scoreVisual(m)}; }
