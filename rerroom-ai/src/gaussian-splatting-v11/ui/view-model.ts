import type { GaussianScene, QualityTier, RenderMode } from '../core/types';
export interface GaussianViewerState {sceneId:string;mode:RenderMode;tier:QualityTier;selectedSplatId?:string;showSemantics:boolean;showAnchors:boolean;showCameraPath:boolean;loading:boolean;error?:string;}
export function initialViewerState(scene:GaussianScene):GaussianViewerState{return {sceneId:scene.id,mode:'rgb',tier:'balanced',showSemantics:false,showAnchors:true,showCameraPath:true,loading:false};}
export function viewerSummary(scene:GaussianScene){return {splatCount:scene.splats.length,quality:scene.quality.score,anchors:scene.splats.filter(s=>!!s.anchorId).length,semanticLabels:[...new Set(scene.splats.map(s=>s.semanticLabel).filter(Boolean))].length};}
