import type {RoomContext} from '../core/types';import {hashEmbedding,cosine} from '../learning/embedding';
export interface RoomEmbedding {roomId:string;vector:number[];createdAt:number;}
export const encodeRoom=(r:RoomContext):RoomEmbedding=>{const summary=[r.roomType,...r.inferredFunctions,...r.objects.map(o=>o.type),...Object.keys(r.styleSignals),...Object.keys(r.colorSignals)].join(' ');return {roomId:r.roomId,vector:hashEmbedding(summary),createdAt:Date.now()};};
export const roomSimilarity=(a:RoomEmbedding,b:RoomEmbedding)=>cosine(a.vector,b.vector);
