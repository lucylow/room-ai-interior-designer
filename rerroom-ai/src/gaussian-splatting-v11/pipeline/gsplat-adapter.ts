import type { QualityTier } from '../core/types';
export interface WorkerCommand {command:string;args:string[];env:Record<string,string>;}
export function buildGsplatTrainCommand(config:{dataset:string;output:string;tier:QualityTier;iterations:number}):WorkerCommand{return {command:'python',args:['python/3dgs_worker/train_gsplat.py','--dataset',config.dataset,'--output',config.output,'--tier',config.tier,'--iterations',String(config.iterations)],env:{PYTHONUNBUFFERED:'1'}};}
export function buildColmapCommand(images:string,workspace:string):WorkerCommand{return {command:'python',args:['python/3dgs_worker/run_colmap.py','--images',images,'--workspace',workspace],env:{}};}
