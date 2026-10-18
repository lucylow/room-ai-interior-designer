
import type {ColorFilter,DesignStyleId,StyleFilter,DesignIntent,RoomContext} from '../../core/types';
import type {CreativeFilterState,CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export function normalizeCreativeFilters(intent:DesignIntent):CreativeFilterState{
  return {styles:[...intent.style.enabled],primaryStyle:intent.style.primary,palettes:[...intent.colors.paletteIds],roomTypes:[intent.roomType],controls:['style','palette','layout','camera','materials','lighting'],intensity:intent.style.intensity==='editorial'?1:.7,preserveArchitecture:intent.preserveArchitecture,preserveFurniture:intent.preserveExistingFurniture.length>0};
}
export function shouldRunStyleFilter(filters:CreativeFilterState):boolean{return filters.controls.includes('style')&&filters.styles.length>0;}
export function shouldRunPaletteFilter(filters:CreativeFilterState):boolean{return filters.controls.includes('palette')&&filters.palettes.length>0;}
export function clampIntensity(filters:CreativeFilterState):CreativeFilterState{return {...filters,intensity:clamp(filters.intensity)};}
export function styleFilterFromState(filters:CreativeFilterState):StyleFilter{return {enabled:filters.styles as DesignStyleId[],excluded:[],primary:filters.primaryStyle as DesignStyleId|undefined,intensity:filters.intensity>.85?'editorial':filters.intensity>.65?'expressive':filters.intensity>.4?'balanced':'subtle'};}
export function colorFilterFromState(filters:CreativeFilterState):ColorFilter{return {paletteIds:filters.palettes,customColors:[],preserveExistingAccents:true};}
export function filterSignals(room:RoomContext,filters:CreativeFilterState):CreativeSignal[]{
  const style=filters.primaryStyle??filters.styles[0]??'modern';
  const styleScore=room.styleSignals[style]??.5;
  const palette=filters.palettes[0]??'warm-white-sand';
  const paletteScore=room.colorSignals[palette]??.5;
  return [
    {id:'filter-style',label:'Style filter fit',score:styleScore,confidence:.79,source:'room-signals',explanation:`${style} is the primary creative direction.`},
    {id:'filter-palette',label:'Palette filter fit',score:paletteScore,confidence:.77,source:'room-signals',explanation:`${palette} is the primary color direction.`},
    {id:'filter-preserve',label:'Architecture preservation',score:filters.preserveArchitecture?1:.3,confidence:.94,source:'intent',explanation:'Structural preservation controls are explicit.'},
  ];
}
