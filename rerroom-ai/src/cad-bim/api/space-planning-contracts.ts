import { LayoutPlan, QuickRevisionRequest, RevisionSnapshot, Zone, FurnitureSpec, ProjectWorkspaceState } from '../planning/types';
export interface SpacePlanningRequest { projectId:string; roomId:string; goal:string; layoutCount:number; preserveIds:string[]; }
export interface SpacePlanningResponse { plans:LayoutPlan[]; zones:Zone[]; suggestedFurniture:FurnitureSpec[]; warnings:string[]; }
export interface QuickRevisionResponse { request:QuickRevisionRequest; revision:RevisionSnapshot; plan?:LayoutPlan; warnings:string[]; }
export interface WorkspaceResponse { state:ProjectWorkspaceState; selectedPanel:'plan'|'3d'|'ai'|'files'|'revisions'|'handoff'; }
