import type { UserPreferences, RoomContext } from '../core/types';
export const styleAffinity=(room:RoomContext,prefs:UserPreferences):Record<string,number>=>{
  const out:Record<string,number>={};
  for(const [style,value] of Object.entries(room.styleSignals)) out[style]=(out[style]??0)+Number(value)*.55;
  for(const style of prefs.preferredStyles) out[style]=(out[style]??0)+.3;
  for(const style of prefs.avoidedStyles) out[style]=(out[style]??0)-.45;
  const entries:Array<[string,number]>=Object.entries(out).map(([k,v])=>[k,Number(v)]);
  entries.sort((a,b)=>b[1]-a[1]);
  return Object.fromEntries(entries.map(([k,v])=>[k,Math.max(-1,Math.min(1,v))]));
};
