import {DatasetRecord} from '../core/types';
export interface SplitConfig { train:number; validation:number; test:number; hardCase:number }
export function assignSplit(index:number,total:number,seed=20261008):DatasetRecord['split']{
  const x=((index*1103515245+seed)>>>0)/4294967296;
  if(x<.1)return 'hard_case'; if(x<.2)return 'test'; if(x<.3)return 'validation'; return 'train';
}
export function splitRecords(records:DatasetRecord[]){const out={train:[] as DatasetRecord[],validation:[] as DatasetRecord[],test:[] as DatasetRecord[],hard_case:[] as DatasetRecord[]};for(const r of records)out[r.hardCase?'hard_case':assignSplit(Number(r.id.slice(-6)),records.length)] .push(r);return out;}
