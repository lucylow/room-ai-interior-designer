import { VisualMetrics, clamp } from '../core/types';
export function regressionGate(before:VisualMetrics,after:VisualMetrics,threshold=.03){ const loss=before.overall-after.overall; return {pass:loss<=threshold,loss,threshold,severity:loss>threshold*2?'critical':loss>threshold?'warning':'info',confidence:clamp(.7-Math.max(0,loss)*.5)}; }
