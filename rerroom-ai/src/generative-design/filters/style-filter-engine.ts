import type {DesignStyleId,RoomContext,StyleFilter,StyleMatch,StyleProfile} from '../core/types';
import {STYLE_LIBRARY} from '../styles';
import {clamp,containsAny} from '../core/utils';
export class StyleFilterEngine {
  constructor(private styles:StyleProfile[]=STYLE_LIBRARY){}
  match(room:RoomContext,filter:StyleFilter,prompt:string):StyleMatch[]{
    const p=prompt.toLowerCase();
    return this.styles.map(style=>{
      const signal=(room.styleSignals[style.id]??0);
      const keywordHits=style.keywords.filter(k=>containsAny(p,[k])).length;
      const avoidHits=style.avoidKeywords.filter(k=>containsAny(p,[k])).length;
      const requested=filter.enabled.includes(style.id)?1:filter.enabled.length?0:.25;
      const excluded=filter.excluded.includes(style.id)?-.9:0;
      const promptBias=keywordHits*.14-avoidHits*.08;
      const primary=filter.primary===style.id?.16:0;
      const score=clamp(.28*signal+.25*requested+.25*(keywordHits/Math.max(1,style.keywords.length))+.22+promptBias+primary+excluded);
      return {styleId:style.id,score,reasons:[`${style.name} room signal ${signal.toFixed(2)}`,keywordHits?`${keywordHits} prompt cues matched`: 'No direct prompt cue'],conflicts:avoidHits?[`${avoidHits} conflicting cues`]:[]} as StyleMatch;
    }).filter(x=>!filter.excluded.includes(x.styleId)).sort((a,b)=>b.score-a.score);
  }
  top(room:RoomContext,filter:StyleFilter,prompt:string,limit=4){return this.match(room,filter,prompt).slice(0,limit)}
  resolveBlend(filter:StyleFilter,limit=3):Array<{styleId:DesignStyleId;weight:number}>{
    const enabled=filter.enabled.length?filter.enabled:STYLE_LIBRARY.map(x=>x.id);
    const raw=enabled.slice(0,limit).map((id,i)=>({styleId:id,weight:filter.blendWeight?.[id]??(1/(i+1))}));
    const sum=raw.reduce((a,b)=>a+b.weight,0)||1; return raw.map(x=>({...x,weight:x.weight/sum}));
  }
}
