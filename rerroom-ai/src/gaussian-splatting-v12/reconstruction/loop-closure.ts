import { Vec3 } from '../core/types';
import { distance, dot, normalize } from '../core/utils';
export type PlaceDescriptor={frameId:string;embedding:number[];position:Vec3};
export type LoopCandidate={a:string;b:string;similarity:number;baseline:number};
export function cosine(a:number[],b:number[]){const n=Math.min(a.length,b.length);let d=0,aa=0,bb=0;for(let i=0;i<n;i++){d+=a[i]*b[i];aa+=a[i]*a[i];bb+=b[i]*b[i]}return d/(Math.sqrt(aa*bb)||1)}
export function findLoopClosures(desc:PlaceDescriptor[],similarityThreshold=.88,maxBaseline=20):LoopCandidate[]{const out:LoopCandidate[]=[];for(let i=0;i<desc.length;i++)for(let j=i+1;j<desc.length;j++){const s=cosine(desc[i].embedding,desc[j].embedding);const b=distance(desc[i].position,desc[j].position);if(s>=similarityThreshold&&b<=maxBaseline)out.push({a:desc[i].frameId,b:desc[j].frameId,similarity:s,baseline:b})}return out}
export function loopWeight(c:LoopCandidate){return c.similarity*Math.exp(-c.baseline/10)}
export function loopSummary(candidates:LoopCandidate[]){const weights=candidates.map(loopWeight);return {count:candidates.length,maxWeight:Math.max(0,...weights),meanWeight:weights.reduce((a,b)=>a+b,0)/(weights.length||1)}}
export function orientationAgreement(a:Vec3,b:Vec3){return dot(normalize(a),normalize(b))}
