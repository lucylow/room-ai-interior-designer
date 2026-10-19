
import type {DesignConcept,GenerationRequest} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export interface CreativeBranchManagerResult {id:string;summary:string;score:number;confidence:number;signals:CreativeSignal[];actions:string[];}
export function runCreativeBranchManager(request:GenerationRequest,concepts:DesignConcept[]):CreativeBranchManagerResult{
 const count=concepts.length;const top=concepts[0];const signal=top?.confidence??.5;const score=clamp(.45+signal*.4+Math.min(.1,count*.015));
 const signals:CreativeSignal[]=[
  {id:'workflow-creative-branch-manager-count',label:'Maintain Branches For Alternate Style Directions breadth',score:clamp(count/8),confidence:.74,source:'creative-workflow',explanation:'The workflow uses multiple alternatives so the user can compare rather than accept one output blindly.'},
  {id:'workflow-creative-branch-manager-confidence',label:'Confidence',score:signal,confidence:.84,source:'creative-workflow',explanation:'Confidence is propagated from room evidence and concept fit.'},
  {id:'workflow-creative-branch-manager-preserve',label:'Preservation',score:request.intent.preserveArchitecture?1:.45,confidence:.93,source:'intent',explanation:'Architecture preservation is explicit in the request.'},
 ];
 return {id:'workflow-creative-branch-manager',summary:'Maintain Branches For Alternate Style Directions completed for an iterative creative session.',score,confidence:clamp(.6+score*.3),signals,actions:['Show 2D plan','Show 3D view','Offer one-variable revisions','Keep source geometry locked']};
}
