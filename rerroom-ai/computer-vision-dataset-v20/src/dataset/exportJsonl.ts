import {DatasetRecord,DatasetManifest} from '../core/types';
export function toJsonl(records:DatasetRecord[]){return records.map(r=>JSON.stringify(r)).join('\n')+'\n';}
export function manifestJson(manifest:DatasetManifest){return JSON.stringify(manifest,null,2)+'\n';}
