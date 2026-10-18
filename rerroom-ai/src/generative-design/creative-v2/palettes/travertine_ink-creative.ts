
import type {ColorFilter,ColorPalette,PaletteMatch,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {PALETTE_BY_ID} from '../../palettes';
import {clamp} from '../../core/utils';

const ID='travertine-ink';
const palette=PALETTE_BY_ID[ID] as ColorPalette;
const TEMPERATURE='neutral';
const MATERIALS='stone|ink|cream'.split('|');

export function scoretravertine_inkPalette(room:RoomContext,filter:ColorFilter):PaletteMatch{
  const signal=room.colorSignals[ID]??0;
  const requested=filter.paletteIds.includes(ID)?.25:filter.paletteIds.length?-.03:.08;
  const temp=filter.temperature===TEMPERATURE?.08:0;
  const saturation=filter.maxSaturation!==undefined&&palette.saturationLevel>filter.maxSaturation?-.12:0;
  const score=clamp(.5+signal*.32+requested+temp+saturation);
  return {paletteId:ID,score,reasons:[`palette signal=${signal.toFixed(2)}`,`temperature=${TEMPERATURE}`],conflicts:saturation<0?['Palette saturation exceeds filter']:[]};
}

export function harmonizetravertine_inkPalette(room:RoomContext,filter:ColorFilter):CreativeSignal[]{
  const match=scoretravertine_inkPalette(room,filter);
  return [
    {id:`travertine-ink-fit`,label:'Palette fit',score:match.score,confidence:.79,source:'color-signals',explanation:palette.description},
    {id:`travertine-ink-warmth`,label:'Warmth balance',score:clamp(.5+palette.warmth*.45),confidence:.76,source:'palette-profile',explanation:`Maintain ${TEMPERATURE} color behavior with controlled accents.`},
    {id:`travertine-ink-material`,label:'Material compatibility',score:clamp(.45+palette.naturalness*.4),confidence:.72,source:'palette-profile',explanation:`Pair with ${MATERIALS.join(', ')} for a coherent material story.`},
  ];
}

export function palettePrompttravertine_ink():string{
  return `${palette.name}: ${palette.description}. Use ${palette.colors.slice(0,4).map(c=>c.hex).join(', ')} with roles preserved; avoid introducing unrelated dominant colors.`;
}
