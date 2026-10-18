
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatedaylight_response(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(room.naturalLightScore+.08);
  const confidence=clamp(.77);
  return {id:`insight-daylight-response`,kind:'opportunity',title:'Daylight response',summary:`Palette and reflective surfaces should reinforce the available daylight.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function carddaylight_response(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatedaylight_response(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
