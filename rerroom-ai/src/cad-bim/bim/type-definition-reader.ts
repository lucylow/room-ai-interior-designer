import { BIMIndex, BIMEntity } from '../core/types';
export interface TypeDefinitionReaderResult { count:number; values:Array<Record<string,unknown>>; warnings:string[]; }
export class TypeDefinitionReader {
  /** captures reusable type definitions. */
  run(index:BIMIndex):TypeDefinitionReaderResult {
    const warnings:string[]=[]; const values=index.entities.map((e:BIMEntity)=>({id:e.id,expressId:e.expressId,className:e.className,globalId:e.globalId,propertySetCount:e.propertySets.length}));
    if(!index.entities.length) warnings.push('BIM index contains no entities.');
    return {count:values.length,values,warnings};
  }
}
