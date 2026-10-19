import { DatasetRecord } from '../core/types';
import { makeVisualDataset } from '../demo/dataset-factory';
export interface DatasetVersion { id:string; records:DatasetRecord[]; createdAt:string; tags:string[]; }
export class VisualDatasetRegistry{ private versions=new Map<string,DatasetVersion>(); register(id:string,records=makeVisualDataset(),tags:string[]=[]){ this.versions.set(id,{id,records,createdAt:new Date(0).toISOString(),tags}); return this.versions.get(id)!; } get(id:string){ return this.versions.get(id); } list(){ return [...this.versions.values()].map(v=>({id:v.id,count:v.records.length,tags:v.tags})); }}
