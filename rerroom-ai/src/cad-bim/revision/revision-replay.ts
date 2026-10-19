import {  RevisionSnapshot } from '../planning/types';
export interface ReplayStep { snapshotId:string; label:string; prompt?:string; }
export function replayTimeline(snapshots:RevisionSnapshot[]):ReplayStep[]{return snapshots.sort((a,b)=>a.createdAt.localeCompare(b.createdAt)).map(s=>({snapshotId:s.id,label:s.label,prompt:s.note}));}
export function canReplay(from:RevisionSnapshot,to:RevisionSnapshot):boolean{return from.projectId===to.projectId && from.createdAt<=to.createdAt;}
