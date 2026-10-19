import type { ReconstructionStage } from '../core/types';
export interface RecoveryDecision {stageId:string;action:'retry'|'skip'|'abort';backoffMs:number;reason:string;}
export function recover(stage:ReconstructionStage,attempt:number):RecoveryDecision{if(stage.name==='handoff-check')return {stageId:stage.id,action:'abort',backoffMs:0,reason:'Handoff gate cannot be silently bypassed'};if(attempt<3)return {stageId:stage.id,action:'retry',backoffMs:250*(attempt+1),reason:'Transient worker failure'};return {stageId:stage.id,action:'abort',backoffMs:0,reason:'Retry limit exceeded'};}
