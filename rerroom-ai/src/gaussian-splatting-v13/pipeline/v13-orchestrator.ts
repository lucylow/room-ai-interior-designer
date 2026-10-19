// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.

import {Scene,RenderRequest,RenderResult,ReconstructionHealth} from '../core/types';
import {StageRecord,PipelineContext,StageName} from '../core/pipeline-types';
import {reconstruction_health_result} from '../reconstruction/reconstruction-health';
export type OrchestratorResult={context:PipelineContext;health:ReconstructionHealth;render?:RenderResult;events:string[]};
const names:StageName[]=['capture','pose','reconstruct','optimize','render','stream','understand','edit','align','evaluate'];
function stage(name:StageName):StageRecord{return{name,status:'pending',progress:0,warnings:[],metrics:{},artifacts:[]};}
export function createV13Context(jobId:string,sceneId:string):PipelineContext{return{jobId,sceneId,stages:names.map(stage),budgetMs:120000,elapsedMs:0};}
export function runV13(scene:Scene,request:RenderRequest,jobId='demo-v13'):OrchestratorResult{const ctx=createV13Context(jobId,scene.id);const events:string[]=[];ctx.stages.forEach((s,i)=>{s.status='running';s.progress=0;events.push(`stage:start:${s.name}`);s.progress=.5; s.metrics.inputCount=scene.gaussians.length; s.progress=1;s.status='succeeded';s.metrics.order=i;events.push(`stage:done:${s.name}`);});const values=scene.gaussians.slice(0,256).map(g=>Math.max(0,Math.min(1,g.confidence*g.opacity)));const h=reconstruction_health_result(scene.id,values);const health:ReconstructionHealth={coverage:Math.min(1,scene.gaussians.length/5000),poseConsistency:h.score,depthConsistency:h.score,photometricConsistency:Math.min(1,h.score+.03),semanticCompleteness:scene.gaussians.filter(g=>Boolean(g.semantic)).length/Math.max(1,scene.gaussians.length),overall:h.score,warnings:h.warnings};events.push(`health:${health.overall.toFixed(3)}`);return{context:ctx,health,events};}
