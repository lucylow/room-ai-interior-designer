import type { UserPreferences, RoomContext } from '../core/types';
export const colorAffinity=(room:RoomContext,prefs:UserPreferences):Record<string,number>=>{
  const out:Record<string,number>={...room.colorSignals};
  for(const c of prefs.preferredColors) out[c]=(out[c]??0)+.35;
  for(const c of prefs.avoidedColors) out[c]=(out[c]??0)-.45;
  const entries:Array<[string,number]>=Object.entries(out).map(([k,v])=>[k,Number(v)]);
  entries.sort((a,b)=>b[1]-a[1]);
  return Object.fromEntries(entries.map(([k,v])=>[k,Math.max(-1,Math.min(1,v))]));
};
