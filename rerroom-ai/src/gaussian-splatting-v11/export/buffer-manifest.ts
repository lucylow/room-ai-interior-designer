import type { GaussianScene } from '../core/types';
export interface BufferManifest {sceneId:string;attributes:string[];bytesPerSplat:number;count:number;version:string;}
export function bufferManifest(scene:GaussianScene):BufferManifest{return {sceneId:scene.id,attributes:['mean','scale','rotation','opacity','sh0','semanticId','confidence'],bytesPerSplat:64,count:scene.splats.length,version:'v11'};}
