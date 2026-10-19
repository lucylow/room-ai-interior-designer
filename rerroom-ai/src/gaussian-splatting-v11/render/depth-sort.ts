import type { ProjectedSplat } from '../core/types';
export function sortFrontToBack(splats:ProjectedSplat[]):ProjectedSplat[]{return [...splats].sort((a,b)=>a.depth-b.depth);}
export function sortBackToFront(splats:ProjectedSplat[]):ProjectedSplat[]{return [...splats].sort((a,b)=>b.depth-a.depth);}
