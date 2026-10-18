import type { SceneObject, SpatialScene } from '../core/types';

export interface PresentationObject {
  objectId: string;
  opacity: number;
  scale: number;
  emphasized: boolean;
}

export interface PlanPresentation {
  roomOpacity: number;
  objects: PresentationObject[];
  hideUi: boolean;
}

export function presentationFor(scene: SpatialScene, primaryId?: string, showFurniture = true): PlanPresentation {
  return {
    roomOpacity: 1,
    objects: scene.objects.map((object: SceneObject) => ({
      objectId: object.id,
      opacity: showFurniture && object.visible ? 1 : 0,
      scale: object.id === primaryId ? 1.04 : 1,
      emphasized: object.id === primaryId,
    })),
    hideUi: false,
  };
}

export function presentationModeFor(reducedMotion: boolean, presentationMode: boolean): {
  animate: boolean;
  hideControls: boolean;
} {
  return {
    animate: presentationMode && !reducedMotion,
    hideControls: presentationMode,
  };
}
