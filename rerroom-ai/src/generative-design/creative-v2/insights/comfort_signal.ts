
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatecomfort_signal(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(room.comfortScore+.06);
  const confidence=clamp(.72);
  return {id:`insight-comfort-signal`,kind:'opportunity',title:'Comfort signal',summary:`Soft seating and layered textiles raise perceived comfort.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardcomfort_signal(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatecomfort_signal(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
