import type {ColorPalette,RoomContext,DesignStyleId} from '../core/types';
import {PALETTE_LIBRARY} from './index';
import {clamp} from '../core/utils';
export class PaletteHarmonizer {
  score(palette:ColorPalette,room:RoomContext,style:DesignStyleId){
    const existing=Object.entries(room.colorSignals).reduce((s,[name,v])=>s+v+(palette.tags.includes(name)?v*.3:0),0);
    const styleBias=palette.id.includes(style) ? .18 : 0;
    const comfort=room.naturalLightScore>.65 && palette.colors.some(c=>c.lightness>.8) ? .06:0;
    return clamp(.25+existing/(Math.max(1,Object.keys(room.colorSignals).length*1.8))+styleBias+comfort);
  }
  recommend(room:RoomContext,style:DesignStyleId,limit=6){return PALETTE_LIBRARY.map(p=>({palette:p,score:this.score(p,room,style)})).sort((a,b)=>b.score-a.score).slice(0,limit)}
  custom(base:ColorPalette,customColors:string[]):ColorPalette{return {...base,colors:[...base.colors,...customColors.map((hex,i)=>({name:`Custom ${i+1}`,hex,role:'accent',temperature:'mixed',lightness:.5,saturation:.5} as const))]};}
}
