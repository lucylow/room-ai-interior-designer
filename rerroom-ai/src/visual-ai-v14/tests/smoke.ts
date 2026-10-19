import { runVisualAIV14 } from '../core/visual-ai-v14-engine';
export function smoke(){ const result=runVisualAIV14(42); if(result.dataset.length!==512) throw new Error('dataset size'); if(!result.room3d.splats.length) throw new Error('3d scene'); if(!result.room2d.furniture.length) throw new Error('2d scene'); return {ok:true,insights:result.insights.length,overall:result.metrics.overall}; }
