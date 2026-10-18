
import type {ColorFilter,ColorPalette,PaletteMatch,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {PALETTE_BY_ID} from '../../palettes';
import {clamp} from '../../core/utils';

const ID='terracotta-cream';
const palette=PALETTE_BY_ID[ID] as ColorPalette;
const TEMPERATURE='warm';
const MATERIALS='terracotta accent|cream|walnut'.split('|');

export function scoreterracotta_creamPalette(room:RoomContext,filter:ColorFilter):PaletteMatch{
  const signal=room.colorSignals[ID]??0;
  const requested=filter.paletteIds.includes(ID)?.25:filter.paletteIds.length?-.03:.08;
  const temp=filter.temperature===TEMPERATURE?.08:0;
  const saturation=filter.maxSaturation!==undefined&&palette.saturationLevel>filter.maxSaturation?-.12:0;
  const score=clamp(.5+signal*.32+requested+temp+saturation);
  return {paletteId:ID,score,reasons:[`palette signal=${signal.toFixed(2)}`,`temperature=${TEMPERATURE}`],conflicts:saturation<0?['Palette saturation exceeds filter']:[]};
}

export function harmonizeterracotta_creamPalette(room:RoomContext,filter:ColorFilter):CreativeSignal[]{
  const match=scoreterracotta_creamPalette(room,filter);
  return [
    {id:`terracotta-cream-fit`,label:'Palette fit',score:match.score,confidence:.79,source:'color-signals',explanation:palette.description},
    {id:`terracotta-cream-warmth`,label:'Warmth balance',score:clamp(.5+palette.warmth*.45),confidence:.76,source:'palette-profile',explanation:`Maintain ${TEMPERATURE} color behavior with controlled accents.`},
    {id:`terracotta-cream-material`,label:'Material compatibility',score:clamp(.45+palette.naturalness*.4),confidence:.72,source:'palette-profile',explanation:`Pair with ${MATERIALS.join(', ')} for a coherent material story.`},
  ];
}

export function palettePromptterracotta_cream():string{
  return `${palette.name}: ${palette.description}. Use ${palette.colors.slice(0,4).map(c=>c.hex).join(', ')} with roles preserved; avoid introducing unrelated dominant colors.`;
}
