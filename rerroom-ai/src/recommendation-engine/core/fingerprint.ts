import type {RoomContext,UserPreferences} from './types';
import {normalizeToken} from './text';
export const stableFingerprint=(room:RoomContext,prefs:UserPreferences):string=>{
  const obj=room.objects.map(o=>[o.type,Math.round(o.position.x*20),Math.round(o.position.z*20),Math.round(o.size.width*20),Math.round(o.size.depth*20),Math.round(o.rotationY*10)]).sort();
  const raw=JSON.stringify({room:room.roomId,type:room.roomType,size:[room.measurements.widthM,room.measurements.depthM],obj,pref:[prefs.preferredStyles,prefs.preferredColors,prefs.priorities]});
  let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619);}return `${normalizeToken(room.roomType)}-${(h>>>0).toString(16)}`;
};
