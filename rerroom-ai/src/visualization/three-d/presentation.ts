import type { SceneObject, SpatialScene } from '../core/types';
import { dist3 } from '../core/vec';
import { lodForDistance, type LODLevel } from '../performance/lod';

export interface PresentationFrame {
  cameraPosition: {x:number;y:number;z:number};
  visibleIds: string[];
  lodById: Record<string,LODLevel>;
  focusId?: string;
}

export function buildPresentationFrame(
  scene: SpatialScene,
  cameraPosition: {x:number;y:number;z:number},
  maxVisible=160,
  focusId?: string,
): PresentationFrame {
  const sorted=[...scene.objects]
    .filter(object=>object.visible)
    .sort((a,b)=>dist3(a.transform.position,cameraPosition)-dist3(b.transform.position,cameraPosition));
  const selected=sorted.slice(0,Math.max(1,maxVisible));
  const lodById:Record<string,LODLevel>={};
  for(const object of selected) lodById[object.id]=object.id===focusId?'high':lodForDistance(dist3(object.transform.position,cameraPosition));
  if(focusId && !lodById[focusId]){
    const focused=scene.objects.find(object=>object.id===focusId);
    if(focused){selected.unshift(focused);lodById[focusId]='high';}
  }
  return {cameraPosition,visibleIds:selected.map(object=>object.id),lodById,focusId};
}

export function presentationOrdering(objects: SceneObject[], frame: PresentationFrame): SceneObject[] {
  const set=new Set(frame.visibleIds);
  return objects.filter(object=>set.has(object.id)).sort((a,b)=>frame.lodById[a.id].localeCompare(frame.lodById[b.id]));
}
