import { DatasetRecord, SceneTwoD, SceneThreeD, VisualInsight } from './types';
import { makeDemoTwoD, makeDemoThreeD } from '../demo/scene-factory';
import { makeVisualDataset } from '../demo/dataset-factory';
import { finalizeVisualMetrics, visualMetrics } from '../quality/visual-score';
import { regressionGate } from '../quality/regression-gate';
import { evaluateComposition } from '../twod/composition';
import { renderDemo } from '../demo/render-demo';
import { evaluateFurniturePlacement } from '../twod/furniture-placement';
export interface VisualAIPipelineOutput { room2d:SceneTwoD; room3d:SceneThreeD; dataset:DatasetRecord[]; metrics:ReturnType<typeof finalizeVisualMetrics>; insights:VisualInsight[]; gate:ReturnType<typeof regressionGate>; render:ReturnType<typeof renderDemo>; }
export function runVisualAIV14(seed=42):VisualAIPipelineOutput{
 const room2d=makeDemoTwoD(`room-${seed}`); const room3d=makeDemoThreeD(`room-${seed}`); const dataset=makeVisualDataset(512);
 const m=finalizeVisualMetrics(visualMetrics(seed));
 const before=finalizeVisualMetrics(visualMetrics(seed+1));
 const gate=regressionGate(before,m,.12);
 const a=evaluateComposition(room2d); const b=evaluateFurniturePlacement(room2d);
 const insights:VisualInsight[]=[{id:'2d-composition',title:'TwoD composition',message:`Score ${(a.value*100).toFixed(0)}%`,severity:a.value<.6?'warning':'info',confidence:a.confidence,evidence:a.reasons},{id:'2d-furniture',title:'Furniture placement',message:`Score ${(b.value*100).toFixed(0)}%`,severity:b.value<.6?'warning':'info',confidence:b.confidence,evidence:b.reasons}];
 return {room2d,room3d,dataset,metrics:m,insights,gate,render:renderDemo()};
}
