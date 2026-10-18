import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeControlEvaluation {id:string;label:string;domain:string;target:number;score:number;confidence:number;promptTokens:string[];actions:string[];warnings:string[];signals:CreativeSignal[];}
const CONTROL={id:'lighting-layering',label:'Lighting layering',domain:'lighting',target:0.7,description:'Combine ambient, task and accent lighting for depth.'};

export function evaluatelighting_layering(room:RoomContext,concept:DesignConcept):CreativeControlEvaluation{
 const baseline=room.naturalLightScore*.65+room.comfortScore*.2+.15;
 const conceptFit=clamp(concept.score*.58+concept.confidence*.2+baseline*.22);
 const score=clamp(conceptFit*.7+CONTROL.target*.3);
 const warnings:string[]=[];
 if(concept.render.geometryLock===false && ['layout','furniture'].includes(CONTROL.domain)) warnings.push('Review geometry before applying physical edits.');
 if(CONTROL.domain==='budget' && room.measurements.widthM*room.measurements.depthM<14) warnings.push('Small footprint: concentrate changes on high-impact surfaces.');
 const signals:CreativeSignal[]=[
  {id:'control-lighting-layering-fit',label:CONTROL.label,score,confidence:.72,source:'creative-control',explanation:CONTROL.description},
  {id:'control-lighting-layering-room',label:'Room compatibility',score:clamp(baseline),confidence:.76,source:'room-state',explanation:'The control is evaluated against room-specific evidence.'},
  {id:'control-lighting-layering-preserve',label:'Preservation',score:concept.render.geometryLock?1:.5,confidence:.9,source:'render-policy',explanation:'Aesthetic controls should not move architectural anchors.'},
 ];
 return {id:`control-lighting-layering`,label:CONTROL.label,domain:CONTROL.domain,target:CONTROL.target,score,confidence:clamp(.58+score*.3),promptTokens:['lighting layering','lighting',CONTROL.label.toLowerCase()],actions:['Compare before and after','Keep the same camera when possible','Preview in 2D and 3D'],warnings,signals};
}

export function promptlighting_layering():string{return `${CONTROL.label}: ${CONTROL.description} Preserve walls, doors, windows, measured dimensions and existing architectural openings.`;}
export function applylighting_layering(concept:DesignConcept):DesignConcept{return {...concept,id:`${concept.id}--control-lighting-layering`,subtitle:`${concept.subtitle} • ${CONTROL.label}`,conceptText:`${concept.conceptText} Control: ${CONTROL.description}`,score:clamp(concept.score*.8+CONTROL.target*.2),confidence:clamp(concept.confidence-.005),render:{...concept.render,notes:[...concept.render.notes,CONTROL.description]}};}
