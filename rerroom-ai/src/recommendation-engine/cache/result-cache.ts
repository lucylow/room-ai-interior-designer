import type {RecommendationSet} from '../core/types';
export interface CacheEntry {key:string;result:RecommendationSet;expiresAt:number;}
export class ResultCache {private rows=new Map<string,CacheEntry>();get(key:string,now=Date.now()){const row=this.rows.get(key);if(!row)return undefined;if(row.expiresAt<=now){this.rows.delete(key);return undefined;}return row.result;}set(key:string,result:RecommendationSet,ttlMs=300000){this.rows.set(key,{key,result,expiresAt:Date.now()+ttlMs});}invalidate(key:string){this.rows.delete(key);}clear(){this.rows.clear();}size(){return this.rows.size;}}
