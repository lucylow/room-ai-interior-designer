import type { Gaussian3D, StreamChunk } from '../core/types';
export function chunkSplats(splats:Gaussian3D[],chunkSize=4096,level=0):StreamChunk[]{const out:StreamChunk[]=[];for(let i=0;i<splats.length;i+=chunkSize){const batch=splats.slice(i,i+chunkSize);out.push({id:`chunk-${level}-${Math.floor(i/chunkSize)}`,level,tileId:`tile-${Math.floor(i/chunkSize)}`,splatIds:batch.map(s=>s.id),byteLength:batch.length*64,priority:1/(1+i/chunkSize)});}return out;}
export function prioritize(chunks:StreamChunk[],distanceById:Map<string,number>):StreamChunk[]{return [...chunks].sort((a,b)=>priority(a,distanceById)-priority(b,distanceById));}
function priority(c:StreamChunk,d:Map<string,number>):number{return c.priority+(d.get(c.id)||10)*-0.01;}
