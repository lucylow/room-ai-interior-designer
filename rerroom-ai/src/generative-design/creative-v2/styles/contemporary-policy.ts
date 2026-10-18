
import type {DesignStyleId,RoomContext,StyleFilter,StyleMatch} from '../../core/types';
import type {CreativeSignal,CreativeDirection} from '../types';
import {STYLE_BY_ID} from '../../styles';
import {clamp} from '../../core/utils';

const STYLE:DesignStyleId='contemporary';
const profile=STYLE_BY_ID[STYLE];
const PALETTE='contemporary-sand';
const TONE='current proportions, refined contrast and flexible material combinations';
const KEYWORDS='stone|oak|black accents|textiles'.split('|');
const AVOID='avoid dated motifs|avoid excessive matching'.split('|');

export function scorecontemporaryStyle(room:RoomContext,prompt:string,filter:StyleFilter):StyleMatch{
  const text=prompt.toLowerCase();
  const signal=room.styleSignals[STYLE]??0;
  const hits=KEYWORDS.filter(x=>text.includes(x.split(' ')[0])).length;
  const requested=filter.enabled.includes(STYLE)?0.2:filter.enabled.length?-.05:0;
  const primary=filter.primary===STYLE?.12:0;
  const excluded=filter.excluded.includes(STYLE)?-1:0;
  const score=clamp(signal*.42+hits*.06+requested+primary+excluded+.48);
  return {styleId:STYLE,score,reasons:[`room signal=${signal.toFixed(2)}`,`prompt cues=${hits}`,`direction=${TONE}`],conflicts:filter.excluded.includes(STYLE)?['Style explicitly excluded']:[]};
}

export function buildcontemporarySignals(room:RoomContext,prompt:string):CreativeSignal[]{
  const match=scorecontemporaryStyle(room,prompt,{enabled:[STYLE],excluded:[],primary:STYLE,intensity:'balanced'});
  return [
    {id:`contemporary-fit`,label:'Style fit',score:match.score,confidence:clamp(.55+room.measurements.confidence*.25),source:'room-style-signals',explanation:`Contemporary fits existing room signals and the requested creative language.`},
    {id:`contemporary-texture`,label:'Texture direction',score:clamp((profile.textureLevel??.5)+.1),confidence:.78,source:'style-profile',explanation:'Use the prescribed surface and textile vocabulary without changing architecture.'},
    {id:`contemporary-contrast`,label:'Contrast direction',score:clamp((profile.contrastLevel??.5)+.05),confidence:.74,source:'style-profile',explanation:'Control contrast so focal elements read clearly in the render.'},
  ];
}

export function makecontemporaryDirection(room:RoomContext,prompt:string):CreativeDirection{
  const match=scorecontemporaryStyle(room,prompt,{enabled:[STYLE],excluded:[],primary:STYLE,intensity:'balanced'});
  const confidence=clamp(.58+room.measurements.confidence*.2+room.naturalLightScore*.1);
  return {id:`direction-contemporary`,title:`Contemporary creative direction`,styleId:STYLE,paletteId:PALETTE,layoutPattern:profile.preferredLayoutPatterns[0]??'open-flow',keywords:[...KEYWORDS,...profile.materials.slice(0,3)],avoid:[...AVOID,...profile.avoidKeywords.slice(0,2)],promptTokens:[TONE,...profile.lightingTerms.slice(0,2)],score:match.score,confidence,reasons:[...match.reasons,'Uses geometry-preserving aesthetic edits only.']};
}

export function filterAllowscontemporaryStyle(filter:StyleFilter):boolean{
  return filter.enabled.length===0||filter.enabled.includes(STYLE);
}
