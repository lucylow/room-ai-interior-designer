
import type {ColorPalette,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface PaletteTransformResult {id:string;label:string;summary:string;score:number;confidence:number;surfaceRules:Record<string,string>;signals:CreativeSignal[];}
export function applydeepen(room:RoomContext,palette:ColorPalette):PaletteTransformResult{
 const signal=room.colorSignals[palette.id]??.5;const score=clamp(.5+signal*.3+palette.naturalness*.08);
 const surfaceRules={wall:'retain dominant role',floor:'preserve existing substrate unless requested',upholstery:'dark',accent:'use on one focal family',metal:'match the palette temperature'};
 return {id:'palette-transform-deepen',label:'Deepen',summary:'Deepen selected anchors while protecting overall readability.',score,confidence:.76,surfaceRules,signals:[
  {id:'palette-transform-deepen-signal',label:'Palette transform fit',score,confidence:.76,source:'palette-transform',explanation:'Deepen selected anchors while protecting overall readability.'},
  {id:'palette-transform-deepen-role',label:'Semantic color roles',score:clamp(.72+palette.contrastTarget*.1),confidence:.74,source:'palette-transform',explanation:'Surface colors remain mapped to semantic roles instead of arbitrary recoloring.'},
  {id:'palette-transform-deepen-natural',label:'Natural material fit',score:clamp(palette.naturalness),confidence:.7,source:'palette-profile',explanation:'Naturalness helps avoid visually synthetic combinations.'}
 ]};
}
