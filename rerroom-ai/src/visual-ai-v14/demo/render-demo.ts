import { makeDemoTwoD, makeDemoThreeD } from './scene-factory';
import { renderPlan } from '../twod/reference-plan-rasterizer';
import { renderSplatPreview } from '../threed/reference-splat-rasterizer';
import { enhanceContrast } from '../render/contrast-enhancer';
import { sharpnessProxy } from '../render/sharpness-proxy';
import { similarity } from '../quality/pixel-diff';
export function renderDemo(){ const p=renderPlan(makeDemoTwoD(),640,448); const p2=enhanceContrast(p,.16); const s=renderSplatPreview(makeDemoThreeD(),640,448); return {planPixels:p.data.length,planSharpness:sharpnessProxy(p),enhancedSharpness:sharpnessProxy(p2),planConsistency:similarity(p,p2),splatPixels:s.data.length}; }
