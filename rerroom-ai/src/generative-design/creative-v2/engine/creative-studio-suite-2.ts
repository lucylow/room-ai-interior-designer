import type {DesignConcept,DesignIntent,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {runstyle_filter_intent_parser} from '../studio2/style_filter_intent_parser';
import {runpalette_intent_parser} from '../studio2/palette_intent_parser';
import {runlayout_advice_writer} from '../studio2/layout_advice_writer';
import {runcreative_diversity_check} from '../studio2/creative_diversity_check';
import {runmock_generation_batch} from '../studio2/mock_generation_batch';
import {rundesign_session_brief} from '../studio2/design_session_brief';
export function runCreativeStudio2(room:RoomContext,concepts:DesignConcept[],intent:DesignIntent){
 const modules=[runstyle_filter_intent_parser(room,concepts,intent),runpalette_intent_parser(room,concepts,intent),runlayout_advice_writer(room,concepts,intent),runcreative_diversity_check(room,concepts,intent),runmock_generation_batch(room,concepts,intent),rundesign_session_brief(room,concepts,intent)];
 const signals=modules.flatMap(m=>m.signals).sort((a,b)=>b.score-a.score);
 return {modules,signals,overall:signals.length?signals.reduce((sum,s)=>sum+s.score*s.confidence,0)/signals.reduce((sum,s)=>sum+s.confidence,0):0};
}
export function studio2Prompt(room:RoomContext,intent:DesignIntent):string{return `Create a ${intent.style.primary??intent.style.enabled[0]??'modern'} ${intent.roomType} with ${intent.colors.paletteIds[0]??'warm-white-sand'} palette guidance. Keep architecture, openings, measurements and scene identity stable.`;}
