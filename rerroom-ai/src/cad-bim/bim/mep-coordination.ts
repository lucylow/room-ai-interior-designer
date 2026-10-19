import { BIMIndex, AuthoritativeModel, DesignOverlay } from '../core/types';
export interface MepCoordinationResult { rows:Array<Record<string,string|number|boolean|null>>; warnings:string[]; }
export class MepCoordination {
  /** maps conceptual fixture changes to source-host relationships. */
  run(model:AuthoritativeModel,index?:BIMIndex,overlay?:DesignOverlay):MepCoordinationResult {
    const rows:Array<Record<string,string|number|boolean|null>>=[]; const warnings:string[]=[];
    const source=model.features.filter(f=>f.bimClass || f.kind==='fixture' || f.kind==='furniture');
    for(const f of source){
      const props=f.properties||{};
      rows.push({featureId:f.id,bimClass:f.bimClass||'Unknown',name:f.name||'',externalId:f.externalId||'',propertyCount:Object.keys(props).length});
    }
    if(index && index.entities.length===0) warnings.push('BIM index is empty.');
    if(overlay?.elements.some(e=>e.anchor===undefined)) warnings.push('Unanchored concepts cannot be treated as BIM construction objects.');
    return {rows,warnings};
  }
}
