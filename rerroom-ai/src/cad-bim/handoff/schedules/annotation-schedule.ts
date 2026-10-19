import { AuthoritativeModel, DesignOverlay } from '../../core/types';
export interface ScheduleRow { sourceFeatureId:string; label:string; type:string; revision:string; properties:Record<string,string|number|boolean|null>; }
export function buildAnnotationSchedule(model:AuthoritativeModel,_overlay?:DesignOverlay):ScheduleRow[] {
  const requested:string = 'annotation'; const kinds:string[] = requested === 'finish' ? ['wall','floor','ceiling'] : [requested];
  return model.features.filter(f=>kinds.includes(String(f.kind))).map(f=>({sourceFeatureId:f.id,label:f.name||f.id,type:f.kind,revision:model.importedRevision,properties:f.properties}));
}
