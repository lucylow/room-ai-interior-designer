
import type {ColorPalette,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface PaletteTransformResult {id:string;label:string;summary:string;score:number;confidence:number;surfaceRules:Record<string,string>;signals:CreativeSignal[];}
export function applyaccent_boost(room:RoomContext,palette:ColorPalette):PaletteTransformResult{
 const signal=room.colorSignals[palette.id]??.5;const score=clamp(.5+signal*.3+palette.naturalness*.08);
 const surfaceRules={wall:'retain dominant role',floor:'preserve existing substrate unless requested',upholstery:'accent',accent:'use on one focal family',metal:'match the palette temperature'};
 return {id:'palette-transform-accent-boost',label:'Accent Boost',summary:'Concentrate saturation in a single visual accent.',score,confidence:.76,surfaceRules,signals:[
  {id:'palette-transform-accent-boost-signal',label:'Palette transform fit',score,confidence:.76,source:'palette-transform',explanation:'Concentrate saturation in a single visual accent.'},
  {id:'palette-transform-accent-boost-role',label:'Semantic color roles',score:clamp(.72+palette.contrastTarget*.1),confidence:.74,source:'palette-transform',explanation:'Surface colors remain mapped to semantic roles instead of arbitrary recoloring.'},
  {id:'palette-transform-accent-boost-natural',label:'Natural material fit',score:clamp(palette.naturalness),confidence:.7,source:'palette-profile',explanation:'Naturalness helps avoid visually synthetic combinations.'}
 ]};
}
