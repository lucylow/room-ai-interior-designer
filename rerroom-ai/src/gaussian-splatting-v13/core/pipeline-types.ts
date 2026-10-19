// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.

export type StageName='capture'|'pose'|'reconstruct'|'optimize'|'render'|'stream'|'understand'|'edit'|'align'|'evaluate';
export type StageStatus='pending'|'running'|'succeeded'|'failed'|'cancelled';
export type StageRecord={name:StageName;status:StageStatus;progress:number;startedAt?:number;endedAt?:number;warnings:string[];metrics:Record<string,number>;artifacts:string[]};
export type PipelineContext={jobId:string;sceneId:string;stages:StageRecord[];budgetMs:number;elapsedMs:number};
