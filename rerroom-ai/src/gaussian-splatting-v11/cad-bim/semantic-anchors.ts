import type { GaussianScene, SceneAnchor } from '../core/types';
export interface AnchorMatch {anchorId:string;splatIds:string[];coverage:number;}
export function matchAnchors(scene:GaussianScene,anchors:SceneAnchor[]):AnchorMatch[]{return anchors.map(a=>{const s=scene.splats.filter(g=>g.anchorId===a.id);return {anchorId:a.id,splatIds:s.map(x=>x.id),coverage:Math.min(1,s.length/50)};});}
