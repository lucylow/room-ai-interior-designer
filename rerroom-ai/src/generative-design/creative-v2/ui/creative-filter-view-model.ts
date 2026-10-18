
import type {CreativeFilterState} from '../types';
export interface CreativeFilterChip {id:string;label:string;selected:boolean;group:'style'|'palette'|'room';description:string;}
export function styleChips(state:CreativeFilterState):CreativeFilterChip[]{return ['modern','minimalist','scandinavian','industrial','japandi','mid-century','bohemian','organic-modern','contemporary','warm-minimal'].map(id=>({id,label:id.replace(/-/g,' '),selected:state.styles.includes(id),group:'style',description:`Generate in ${id.replace(/-/g,' ')} direction.`}));}
export function paletteChips(state:CreativeFilterState):CreativeFilterChip[]{return state.palettes.map(id=>({id,label:id.replace(/-/g,' '),selected:true,group:'palette',description:`Apply ${id.replace(/-/g,' ')} color guidance.`}));}
export function filterSummary(state:CreativeFilterState):string{return `${state.primaryStyle??state.styles[0]??'modern'} • ${state.palettes[0]??'warm-white-sand'} • intensity ${Math.round(state.intensity*100)}%`;}
