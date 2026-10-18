import type {ColorFilter,ColorPalette,RoomContext,PaletteMatch} from '../core/types';
import {PALETTE_LIBRARY} from '../palettes';
import {clamp} from '../core/utils';
export class ColorFilterEngine {
  constructor(private palettes:ColorPalette[]=PALETTE_LIBRARY){}
  match(room:RoomContext,filter:ColorFilter):PaletteMatch[]{
    return this.palettes.map(p=>{
      const signal=p.colors.reduce((s,c)=>s+(room.colorSignals[c.name.toLowerCase()]??room.colorSignals[c.name]??.15),0)/p.colors.length;
      const temp=filter.temperature&&p.colors.every(c=>c.temperature===filter.temperature)? .16: filter.temperature==='warm'?p.warmth*.08:0;
      const saturationPenalty=filter.maxSaturation!==undefined?Math.max(0,p.saturationLevel-filter.maxSaturation)*.45:0;
      const explicit=filter.paletteIds.includes(p.id)?.2:0;
      const score=clamp(signal*.55+p.naturalness*.2+p.contrastTarget*.1+explicit+temp-saturationPenalty);
      return {paletteId:p.id,score,reasons:[`Palette naturalness ${p.naturalness.toFixed(2)}`,`Room color compatibility ${signal.toFixed(2)}`],conflicts:saturationPenalty?[`Saturation ${p.saturationLevel.toFixed(2)} is above the filter`]:[]} as PaletteMatch;
    }).sort((a,b)=>b.score-a.score);
  }
}
