import { AestheticIntent, AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';
export interface UploadSourceRequest { projectId:string; fileName:string; mimeType:string; sizeBytes:number; checksum:string; }
export interface ImportJobResponse { jobId:string; status:'queued'|'processing'|'ready'|'failed'; sourceDocumentId?:string; message?:string; }
export interface ConceptJobRequest { projectId:string; authoritativeModelId:string; intent:AestheticIntent; parentOverlayId?:string; }
export interface ConceptJobResponse { jobId:string; overlay?:DesignOverlay; status:'queued'|'ready'|'failed'; warnings:string[]; }
export interface HandoffJobRequest { projectId:string; authoritativeModelId:string; approvedOverlayId:string; }
export interface HandoffJobResponse { jobId:string; package?:HandoffPackage; status:'queued'|'ready'|'failed'; warnings:string[]; }
export interface SourceModelResponse { model:AuthoritativeModel; readOnly:true; }
