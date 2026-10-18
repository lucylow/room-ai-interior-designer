import { BIMIndex, BIMEntity, BIMPropertySet } from '../core/types';
export interface RelationIndexResult { count:number; values:Array<Record<string,unknown>>; warnings:string[]; }
export class RelationIndex {
  /** indexes EXPRESS references between BIM entities. */
  run(index:BIMIndex):RelationIndexResult {
    const warnings:string[]=[]; const values=index.entities.map((e:BIMEntity)=>({id:e.id,expressId:e.expressId,className:e.className,globalId:e.globalId,propertySetCount:e.propertySets.length}));
    if(!index.entities.length) warnings.push('BIM index contains no entities.');
    return {count:values.length,values,warnings};
  }
}
