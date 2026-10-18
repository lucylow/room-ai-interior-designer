import type {RoomContext,Insight} from '../core/types';
export interface Marker{id:string;label:string;severity:string;position:{x:number;z:number};}
export const insightMarkers=(room:RoomContext,insights:Insight[]):Marker[]=>insights.slice(0,10).map((i,index)=>{const obj=room.objects[index%Math.max(1,room.objects.length)];return {id:i.id,label:i.title,severity:i.severity,position:{x:obj?.position.x??0,z:obj?.position.z??0}};});
