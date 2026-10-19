import { CameraPose, Vec3 } from '../core/types';
import { distance } from '../core/utils';
export type Landmark={id:string;position:Vec3;descriptor:number[]};
export type RelocalizationMatch={landmarkId:string;pixel:{x:number;y:number};score:number;distance:number};
export function descriptorSimilarity(a:number[],b:number[]){const n=Math.min(a.length,b.length);let dotv=0,na=0,nb=0;for(let i=0;i<n;i++){dotv+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i]}return dotv/(Math.sqrt(na*nb)||1)}
export function matchLandmarks(query:number[],landmarks:Landmark[],min=.7):Landmark[]{return landmarks.filter(l=>descriptorSimilarity(query,l.descriptor)>=min).sort((a,b)=>descriptorSimilarity(query,b.descriptor)-descriptorSimilarity(query,a.descriptor))}
export function estimatePose(matches:RelocalizationMatch[],seed:CameraPose):{pose:CameraPose;confidence:number}{const w=matches.reduce((s,m)=>s+m.score,0)/(matches.length||1);const shift=Math.min(.5,matches.reduce((s,m)=>s+m.distance,0)/(Math.max(1,matches.length)*10));return {pose:{...seed,position:{x:seed.position.x+shift,y:seed.position.y,z:seed.position.z}},confidence:Math.min(1,w*.85+Math.min(.15,matches.length/100))}}
export function parallaxRisk(points:Vec3[]){if(points.length<2)return 1;let d=0;for(let i=1;i<points.length;i++)d+=distance(points[i-1],points[i]);return 1-Math.min(1,d/(points.length*2))}
