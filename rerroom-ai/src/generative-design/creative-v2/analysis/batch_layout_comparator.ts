
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function batch_layout_comparator(room:RoomContext,_concept:DesignConcept):CreativeSignal{
 const score=clamp(room.circulationScore*.6+room.visualBalanceScore*.4);
 return {id:'analysis-batch-layout-comparator',label:'Compare Layout Alternatives Against Circulation',score,confidence:.72,source:'creative-analysis',explanation:'compare layout alternatives against circulation'};
}
export function batch_layout_comparatorBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>batch_layout_comparator(room,c));}
