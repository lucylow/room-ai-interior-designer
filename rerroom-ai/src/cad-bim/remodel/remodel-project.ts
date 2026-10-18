import { AuthoritativeModel, DesignOverlay, RemodelProject, RemodelStatus } from '../core/types';
export function createRemodelProject(model:AuthoritativeModel,name:string):RemodelProject{return {id:`project_${Date.now()}`,name,status:'imported',authoritativeModel:model,overlays:[],changes:[],selectedFeatureIds:[]};}
export function activateOverlay(project:RemodelProject,overlay:DesignOverlay):RemodelProject{return {...project,activeOverlayId:overlay.id,overlays:[...project.overlays,overlay]};}
export function approveOverlay(project:RemodelProject,overlayId:string):RemodelProject{const overlay=project.overlays.find(o=>o.id===overlayId);if(!overlay)throw new Error('Overlay not found');return {...project,status:'approved',clientApprovedOverlayId:overlayId,activeOverlayId:overlayId};}
