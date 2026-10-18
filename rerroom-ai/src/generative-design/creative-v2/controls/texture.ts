import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeControlEvaluation {id:string;label:string;domain:string;target:number;score:number;confidence:number;promptTokens:string[];actions:string[];warnings:string[];signals:CreativeSignal[];}
const CONTROL={id:'texture',label:'Texture richness',domain:'materials',target:0.66,description:'Add layered tactile materials without adding structural complexity.'};

export function evaluatetexture(room:RoomContext,concept:DesignConcept):CreativeControlEvaluation{
 const baseline=room.sustainabilityScore*.45+room.comfortScore*.25+.3;
 const conceptFit=clamp(concept.score*.58+concept.confidence*.2+baseline*.22);
 const score=clamp(conceptFit*.7+CONTROL.target*.3);
 const warnings:string[]=[];
 if(concept.render.geometryLock===false && ['layout','furniture'].includes(CONTROL.domain)) warnings.push('Review geometry before applying physical edits.');
 if(CONTROL.domain==='budget' && room.measurements.widthM*room.measurements.depthM<14) warnings.push('Small footprint: concentrate changes on high-impact surfaces.');
 const signals:CreativeSignal[]=[
  {id:'control-texture-fit',label:CONTROL.label,score,confidence:.72,source:'creative-control',explanation:CONTROL.description},
  {id:'control-texture-room',label:'Room compatibility',score:clamp(baseline),confidence:.76,source:'room-state',explanation:'The control is evaluated against room-specific evidence.'},
  {id:'control-texture-preserve',label:'Preservation',score:concept.render.geometryLock?1:.5,confidence:.9,source:'render-policy',explanation:'Aesthetic controls should not move architectural anchors.'},
 ];
 return {id:`control-texture`,label:CONTROL.label,domain:CONTROL.domain,target:CONTROL.target,score,confidence:clamp(.58+score*.3),promptTokens:['texture richness','materials',CONTROL.label.toLowerCase()],actions:['Compare before and after','Keep the same camera when possible','Preview in 2D and 3D'],warnings,signals};
}

export function prompttexture():string{return `${CONTROL.label}: ${CONTROL.description} Preserve walls, doors, windows, measured dimensions and existing architectural openings.`;}
export function applytexture(concept:DesignConcept):DesignConcept{return {...concept,id:`${concept.id}--control-texture`,subtitle:`${concept.subtitle} • ${CONTROL.label}`,conceptText:`${concept.conceptText} Control: ${CONTROL.description}`,score:clamp(concept.score*.8+CONTROL.target*.2),confidence:clamp(concept.confidence-.005),render:{...concept.render,notes:[...concept.render.notes,CONTROL.description]}};}
