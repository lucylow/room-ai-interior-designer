
import type {DesignStyleId,RoomContext,StyleFilter,StyleMatch} from '../../core/types';
import type {CreativeSignal,CreativeDirection} from '../types';
import {STYLE_BY_ID} from '../../styles';
import {clamp} from '../../core/utils';

const STYLE:DesignStyleId='japandi';
const profile=STYLE_BY_ID[STYLE];
const PALETTE='japandi-clay';
const TONE='quiet natural materials, disciplined asymmetry and tactile calm';
const KEYWORDS='oak|linen|ceramic|stone'.split('|');
const AVOID='avoid high-saturation accents|avoid cluttered shelves'.split('|');

export function scorejapandiStyle(room:RoomContext,prompt:string,filter:StyleFilter):StyleMatch{
  const text=prompt.toLowerCase();
  const signal=room.styleSignals[STYLE]??0;
  const hits=KEYWORDS.filter(x=>text.includes(x.split(' ')[0])).length;
  const requested=filter.enabled.includes(STYLE)?0.2:filter.enabled.length?-.05:0;
  const primary=filter.primary===STYLE?.12:0;
  const excluded=filter.excluded.includes(STYLE)?-1:0;
  const score=clamp(signal*.42+hits*.06+requested+primary+excluded+.48);
  return {styleId:STYLE,score,reasons:[`room signal=${signal.toFixed(2)}`,`prompt cues=${hits}`,`direction=${TONE}`],conflicts:filter.excluded.includes(STYLE)?['Style explicitly excluded']:[]};
}

export function buildjapandiSignals(room:RoomContext,prompt:string):CreativeSignal[]{
  const match=scorejapandiStyle(room,prompt,{enabled:[STYLE],excluded:[],primary:STYLE,intensity:'balanced'});
  return [
    {id:`japandi-fit`,label:'Style fit',score:match.score,confidence:clamp(.55+room.measurements.confidence*.25),source:'room-style-signals',explanation:`Japandi fits existing room signals and the requested creative language.`},
    {id:`japandi-texture`,label:'Texture direction',score:clamp((profile.textureLevel??.5)+.1),confidence:.78,source:'style-profile',explanation:'Use the prescribed surface and textile vocabulary without changing architecture.'},
    {id:`japandi-contrast`,label:'Contrast direction',score:clamp((profile.contrastLevel??.5)+.05),confidence:.74,source:'style-profile',explanation:'Control contrast so focal elements read clearly in the render.'},
  ];
}

export function makejapandiDirection(room:RoomContext,prompt:string):CreativeDirection{
  const match=scorejapandiStyle(room,prompt,{enabled:[STYLE],excluded:[],primary:STYLE,intensity:'balanced'});
  const confidence=clamp(.58+room.measurements.confidence*.2+room.naturalLightScore*.1);
  return {id:`direction-japandi`,title:`Japandi creative direction`,styleId:STYLE,paletteId:PALETTE,layoutPattern:profile.preferredLayoutPatterns[0]??'open-flow',keywords:[...KEYWORDS,...profile.materials.slice(0,3)],avoid:[...AVOID,...profile.avoidKeywords.slice(0,2)],promptTokens:[TONE,...profile.lightingTerms.slice(0,2)],score:match.score,confidence,reasons:[...match.reasons,'Uses geometry-preserving aesthetic edits only.']};
}

export function filterAllowsjapandiStyle(filter:StyleFilter):boolean{
  return filter.enabled.length===0||filter.enabled.includes(STYLE);
}
