import { hashString } from '../core/types';
export type ChunkDigest={id:string;hash:string;bytes:number};
export function digest(id:string,payload:string):ChunkDigest{return{id,hash:hashString(payload).toString(16),bytes:payload.length}}
export function verify(d:ChunkDigest,payload:string){return d.hash===hashString(payload).toString(16)&&d.bytes===payload.length}
export function chain(digests:ChunkDigest[]){let state='';for(const d of digests)state=hashString(state+d.id+d.hash+d.bytes).toString(16);return state}
