import type { GaussianScene } from '../core/types';
import { clusterBySemantic } from '../scene/semantic-clusters';
export interface SceneCaption {summary:string;objects:string[];materials:string[];confidence:number;}
export function captionScene(scene:GaussianScene):SceneCaption{const clusters=clusterBySemantic(scene.splats);const objects=clusters.filter(c=>!['wall','floor','ceiling'].includes(c.label)).slice(0,8).map(c=>`${c.count} ${c.label}`);const mats=[...new Set(scene.splats.map(s=>s.materialClass).filter(Boolean) as string[])].slice(0,8);return {summary:`A ${scene.roomId} reconstruction with ${scene.splats.length.toLocaleString()} Gaussian elements and stable room-scale geometry.`,objects,materials:mats,confidence:scene.quality.score};}
