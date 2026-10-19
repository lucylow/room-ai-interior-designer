import type { GaussianScene } from '../core/types';
export function sceneManifest(scene:GaussianScene){return {sceneId:scene.id,roomId:scene.roomId,sourceManifestId:scene.sourceManifestId,authority:scene.authority,splatCount:scene.splats.length,cameraCount:scene.cameraIds.length,bounds:scene.bounds,quality:scene.quality,semanticVersion:scene.semanticVersion};}
