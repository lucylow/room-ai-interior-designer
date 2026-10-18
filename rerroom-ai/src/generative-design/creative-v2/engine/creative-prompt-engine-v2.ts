
import type {ColorPalette,DesignIntent,RoomContext,StyleProfile} from '../../core/types';
import type {CreativeDirection} from '../types';
import {STYLE_BY_ID} from '../../styles';
import {PALETTE_BY_ID} from '../../palettes';

export interface PromptAssembly {positive:string;negative:string[];constraints:string[];tokens:string[];}
export function assembleCreativePrompt(room:RoomContext,intent:DesignIntent,direction:CreativeDirection):PromptAssembly{
 const style=(STYLE_BY_ID[direction.styleId]??STYLE_BY_ID.modern) as StyleProfile;
 const palette=(PALETTE_BY_ID[direction.paletteId??'warm-white-sand']??PALETTE_BY_ID['warm-white-sand']) as ColorPalette;
 const tokens=[room.roomType,style.name,palette.name,...style.materials.slice(0,4),...style.lightingTerms.slice(0,2),...direction.keywords.slice(0,4)];
 return {positive:[`Photorealistic interior design concept for a ${room.roomType}.`,`Style: ${style.summary}.`,`Palette: ${palette.description}.`,`Creative brief: ${intent.userPrompt}.`,`Composition: ${direction.layoutPattern}.`].join(' '),negative:[...style.negativePrompt,'moved architecture','invented openings','incorrect scale','distorted furniture','floating objects'],constraints:['Preserve walls, floors, ceilings, doors and windows.','Preserve measured dimensions.','Preserve requested existing furniture dimensions.',...intent.prohibitedChanges.map(x=>`Do not ${x}.`)],tokens};
}
export function promptDiff(previous:string,current:string):{added:string[];removed:string[]}{
 const p=new Set(previous.toLowerCase().split(/\W+/).filter(Boolean));const c=new Set(current.toLowerCase().split(/\W+/).filter(Boolean));return {added:[...c].filter(x=>!p.has(x)).slice(0,30),removed:[...p].filter(x=>!c.has(x)).slice(0,30)};
}
