
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatelayout_flow(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(room.circulationScore+.1);
  const confidence=clamp(.58+room.circulationScore*.3);
  return {id:`insight-layout-flow`,kind:'layout',title:'Layout flow',summary:`The recommended layout explicitly protects circulation.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardlayout_flow(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatelayout_flow(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
