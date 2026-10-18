import type {DesignConcept,DesignIntent,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface StudioModuleResult {id:string;label:string;summary:string;score:number;confidence:number;signals:CreativeSignal[];actions:string[];}
const ID='mock-generation-batch';
export function runmock_generation_batch(room:RoomContext,concepts:DesignConcept[],intent:DesignIntent):StudioModuleResult{
 const count=concepts.length;
 const evidence=room.measurements.confidence*.25+room.circulationScore*.2+room.visualBalanceScore*.2+room.naturalLightScore*.15+Math.min(.2,count/10);
 const score=clamp(.32+evidence);
 const signals:CreativeSignal[]=[
  {id:`${ID}-coverage`,label:'Creative coverage',score,confidence:.78,source:'studio-module',explanation:'Produce deterministic concept records for demo mode and UI regression.'},
  {id:`${ID}-style`,label:'Style awareness',score:clamp(intent.style.enabled.length? .86:.66),confidence:.82,source:'creative-intent',explanation:'The selected style filters remain explicit throughout generation.'},
  {id:`${ID}-palette`,label:'Palette awareness',score:clamp(intent.colors.paletteIds.length? .86:.64),confidence:.8,source:'creative-intent',explanation:'Palette choices remain separate from structural geometry.'},
  {id:`${ID}-iteration`,label:'Iteration support',score:clamp(concepts[0]?.nextPrompts.length? .9:.5),confidence:.84,source:'concept-state',explanation:'The current concept carries follow-up refinement prompts.'},
 ];
 return {id:ID,label:'Mock generation batch',summary:'Produce deterministic concept records for demo mode and UI regression.',score,confidence:clamp(.6+score*.3),signals,actions:['Preserve architectural geometry','Compare multiple alternatives','Use one-variable revisions','Show 2D and 3D views']};
}
export function explainmock_generation_batch(result:StudioModuleResult):string{return `${result.label}: ${result.summary} Score ${(result.score*100).toFixed(0)}%.`;}
