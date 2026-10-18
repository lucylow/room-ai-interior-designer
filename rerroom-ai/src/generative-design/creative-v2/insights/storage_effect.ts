
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatestorage_effect(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(room.storageScore+.07);
  const confidence=clamp(.73);
  return {id:`insight-storage-effect`,kind:'opportunity',title:'Storage effect',summary:`Storage changes can support cleaner generated imagery and daily usability.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardstorage_effect(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatestorage_effect(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
