
import type {DesignConcept,DesignFeedback,DesignIntent,DesignSession,GenerationRequest,RoomContext} from '../../core/types';
import type {CreativeFilterState,CreativeRunReport} from '../types';
import {normalizeCreativeFilters} from './creative-filter-model';
import {recommendRevision,applyRevisionById} from './revision-engine-v2';
import {createGeneratedConcept} from './concept-factory-v2';

export interface CreativeSessionState {filters:CreativeFilterState;current?:DesignConcept;revisionCount:number;promptHistory:string[];reports:CreativeRunReport[];}
export function createSession(intent:DesignIntent):CreativeSessionState{return {filters:normalizeCreativeFilters(intent),revisionCount:0,promptHistory:[intent.userPrompt],reports:[]};}
export function refineSession(state:CreativeSessionState,concept:DesignConcept,prompt:string):CreativeSessionState{
 const id=recommendRevision(concept,prompt);const refined=applyRevisionById(concept,id);
 return {...state,current:refined,revisionCount:state.revisionCount+1,promptHistory:[...state.promptHistory,prompt].slice(-12)};
}
export function sessionFromRoom(room:RoomContext,intent:DesignIntent):CreativeSessionState{const state=createSession(intent);return {...state,filters:{...state.filters,roomTypes:[room.roomType]}};}
export function sessionSummary(state:CreativeSessionState):Record<string,number>{return {revisionCount:state.revisionCount,promptCount:state.promptHistory.length,reportCount:state.reports.length};}
export function attachFeedback(state:CreativeSessionState,feedback:DesignFeedback):CreativeSessionState{return {...state,promptHistory:feedback.reason?[...state.promptHistory,feedback.reason]:state.promptHistory};}
export function asDesignSession(state:CreativeSessionState,roomId:string):DesignSession{return {id:`creative-${roomId}`,roomId,sourceType:'photo',history:state.promptHistory,currentConceptId:state.current?.id,feedback:[],lockedObjectIds:[],styleFilter:{enabled:state.filters.styles as any,excluded:[],primary:state.filters.primaryStyle as any,intensity:'balanced'},colorFilter:{paletteIds:state.filters.palettes,customColors:[],preserveExistingAccents:true}};}
