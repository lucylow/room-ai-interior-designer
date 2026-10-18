
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatestyle_fit(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.4+(room.styleSignals[concept.styleId]??0)*.5);
  const confidence=clamp(.55+room.measurements.confidence*.25);
  return {id:`insight-style-fit`,kind:'style',title:'Style fit',summary:`The selected style is supported by measured room signals.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardstyle_fit(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatestyle_fit(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
