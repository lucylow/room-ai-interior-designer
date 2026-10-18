import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface StudioArtifact {id:string;title:string;domain:string;summary:string;tokens:string[];actions:string[];signals:CreativeSignal[];confidence:number;}

const ARTIFACT={id:'concept-story',title:'Concept story',domain:'story',summary:'Explain the narrative arc of an AI-generated room concept.'};

function baseline(room:RoomContext,concept:DesignConcept):number{
  const spatial=room.circulationScore*.22+room.visualBalanceScore*.2+room.naturalLightScore*.12;
  const conceptFit=concept.score*.28+concept.confidence*.18;
  return clamp(.3+spatial+conceptFit);
}

export function buildconcept_story(room:RoomContext,concept:DesignConcept):StudioArtifact{
  const score=baseline(room,concept);
  const tokens=[concept.styleId,concept.paletteId??'custom',String(concept.layout[0]?.pattern??'open-flow'),'geometry-locked'];
  const signals:CreativeSignal[]=[
    {id:`concept-story-fit`,label:'Studio fit',score,confidence:.78,source:'creative-studio',explanation:'Explain the narrative arc of an AI-generated room concept.'},
    {id:`concept-story-evidence`,label:'Evidence coverage',score:clamp(.5+concept.evidence.length*.035),confidence:.75,source:'creative-evidence',explanation:'The artifact is grounded in room, concept and prompt evidence.'},
    {id:`concept-story-reversible`,label:'Reversibility',score:concept.render.geometryLock?1:.55,confidence:.9,source:'creative-policy',explanation:'Creative changes remain separate from architectural truth.'},
  ];
  const actions=['Keep source geometry fixed','Compare against the previous concept','Apply one-variable revisions first','Show the result in 2D and 3D'];
  return {id:ARTIFACT.id,title:ARTIFACT.title,domain:ARTIFACT.domain,summary:ARTIFACT.summary,tokens,actions,signals,confidence:clamp(.58+score*.34)};
}

export function summarizeconcept_story(artifact:StudioArtifact):string{
  return `${ARTIFACT.title}: ${ARTIFACT.summary} Confidence ${(artifact.confidence*100).toFixed(0)}%.`;
}
