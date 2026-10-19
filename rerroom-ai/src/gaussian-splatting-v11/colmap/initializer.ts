import type { Gaussian3D } from '../core/types';
import type { ColmapDataset } from './types';

export function initializeGaussiansFromPoints(dataset:ColmapDataset,seed=11):Gaussian3D[]{return dataset.points.map((p,_i)=>({id:`gs-${seed}-${p.id}`,mean:p.xyz,scale:[0.012,0.012,0.012],rotation:[1,0,0,0],opacity:Math.max(0.15,Math.min(0.9,1/(1+p.error))),shDegree:0,sh:[(p.rgb[0]/255-0.5)/0.2820947917,(p.rgb[1]/255-0.5)/0.2820947917,(p.rgb[2]/255-0.5)/0.2820947917],confidence:Math.max(0.1,1/(1+p.error)),sourceFrameIds:dataset.images.filter(img=>img.id===p.imageIds[0]).map(img=>img.name)}));}
