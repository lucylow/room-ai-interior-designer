import type {GenerationRequest,GenerationResult} from '../core/types';
export interface RemoteGenerativeProvider{id:string;generate(request:GenerationRequest,signal?:AbortSignal):Promise<GenerationResult>;}
export const createRemoteProvider=(id:string,endpoint:string,fetchImpl=fetch):RemoteGenerativeProvider=>({id,async generate(request,signal){const res=await fetchImpl(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(request),signal});if(!res.ok)throw new Error(`Generative provider error ${res.status}`);return await res.json() as GenerationResult;}});
