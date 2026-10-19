import { BIMIndex, BIMEntity } from '../core/types';
export interface PropertySetIndexResult { count:number; values:Array<Record<string,unknown>>; warnings:string[]; }
export class PropertySetIndex {
  /** normalizes property set names. */
  run(index:BIMIndex):PropertySetIndexResult {
    const warnings:string[]=[]; const values=index.entities.map((e:BIMEntity)=>({id:e.id,expressId:e.expressId,className:e.className,globalId:e.globalId,propertySetCount:e.propertySets.length}));
    if(!index.entities.length) warnings.push('BIM index contains no entities.');
    return {count:values.length,values,warnings};
  }
}
