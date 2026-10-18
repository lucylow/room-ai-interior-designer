import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {buildstyle_matrix} from '../studio/style_matrix';
import {buildpalette_rationale} from '../studio/palette_rationale';
import {buildlayout_coach} from '../studio/layout_coach';
import {buildmoodboard_copy} from '../studio/moodboard_copy';
import {buildmaterial_alternatives} from '../studio/material_alternatives';
import {buildfurniture_alternatives} from '../studio/furniture_alternatives';
import {buildcamera_shot_list} from '../studio/camera_shot_list';
import {buildcreative_brief} from '../studio/creative_brief';
import {buildclient_language} from '../studio/client_language';
import {buildstyle_guardrails} from '../studio/style_guardrails';
import {builddesign_system} from '../studio/design_system';
import {buildconcept_story} from '../studio/concept_story';
export interface StudioSuiteResult {artifacts:Array<{id:string;title:string;domain:string;summary:string;confidence:number}>;signals:CreativeSignal[];overall:number;}
export function runCreativeStudioSuite(room:RoomContext,concept:DesignConcept):StudioSuiteResult{
 const artifacts=[buildstyle_matrix(room,concept),buildpalette_rationale(room,concept),buildlayout_coach(room,concept),buildmoodboard_copy(room,concept),buildmaterial_alternatives(room,concept),buildfurniture_alternatives(room,concept),buildcamera_shot_list(room,concept),buildcreative_brief(room,concept),buildclient_language(room,concept),buildstyle_guardrails(room,concept),builddesign_system(room,concept),buildconcept_story(room,concept)];
 const signals=artifacts.flatMap(a=>a.signals).sort((a,b)=>b.score-a.score);
 const overall=signals.length?signals.reduce((s,x)=>s+x.score*x.confidence,0)/signals.reduce((s,x)=>s+x.confidence,0):0;
 return {artifacts:artifacts.map(a=>({id:a.id,title:a.title,domain:a.domain,summary:a.summary,confidence:a.confidence})),signals,overall};
}
export function creativeStudioNarrative(room:RoomContext,concept:DesignConcept):string{
 const suite=runCreativeStudioSuite(room,concept);
 const lead=suite.artifacts.slice(0,4).map(a=>a.summary).join(' ');
 return `The ${concept.styleId} concept uses ${concept.paletteId??'a custom palette'} and a ${concept.layout[0]?.pattern??'open-flow'} strategy. ${lead}`;
}
