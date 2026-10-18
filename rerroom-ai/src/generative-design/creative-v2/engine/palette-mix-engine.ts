
import type {ColorFilter,ColorPalette,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {PALETTE_LIBRARY,PALETTE_BY_ID} from '../../palettes';
import {clamp} from '../../core/utils';

export interface PaletteMix {id:string;paletteIds:string[];weights:number[];score:number;confidence:number;language:string[];}
export function rankPalettes(room:RoomContext,filter:ColorFilter,limit=8):PaletteMix[]{
 const ids=(filter.paletteIds.length?filter.paletteIds:PALETTE_LIBRARY.map(p=>p.id)).filter(id=>PALETTE_BY_ID[id]).slice(0,limit);
 const mixes=ids.map((id,i)=>{const p=PALETTE_BY_ID[id] as ColorPalette;const signal=room.colorSignals[id]??.5;const requested=filter.paletteIds.includes(id)?.22:0;const score=clamp(.48+signal*.35+requested+p.naturalness*.06);return {id:`palette-mix-${id}`,paletteIds:[id],weights:[1],score,confidence:.72+p.naturalness*.15,language:p.colors.slice(0,4).map(c=>c.name)};});
 return mixes.sort((a,b)=>b.score-a.score);
}
export function paletteSignals(room:RoomContext,paletteId:string):CreativeSignal[]{
 const p=PALETTE_BY_ID[paletteId] as ColorPalette|undefined;if(!p)return [];
 return [
  {id:`palette-${paletteId}-contrast`,label:'Contrast',score:clamp(p.contrastTarget),confidence:.76,source:'palette-profile',explanation:`Target contrast ${p.contrastTarget.toFixed(2)}.`},
  {id:`palette-${paletteId}-warmth`,label:'Warmth',score:clamp(.5+p.warmth*.45),confidence:.76,source:'palette-profile',explanation:`Warmth score ${p.warmth.toFixed(2)}.`},
  {id:`palette-${paletteId}-natural`,label:'Naturalness',score:clamp(p.naturalness),confidence:.73,source:'palette-profile',explanation:`Natural material compatibility ${p.naturalness.toFixed(2)}.`},
 ];
}
