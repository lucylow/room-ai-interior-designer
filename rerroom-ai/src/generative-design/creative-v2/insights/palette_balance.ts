
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatepalette_balance(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.5+(room.colorSignals[concept.paletteId??"warm-white-sand"]??0)*.5);
  const confidence=clamp(.72);
  return {id:`insight-palette-balance`,kind:'color',title:'Palette balance',summary:`The chosen palette aligns with the room color evidence.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardpalette_balance(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatepalette_balance(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
