import {DatasetRecord} from '../core/types';
export interface ValidationIssue { code:string; severity:'warning'|'error'; message:string }
export function validateReconstructionvalidator(record:DatasetRecord):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  if(!record.id)issues.push({code:'MISSING_ID',severity:'error',message:'record id missing'});
  if(record.depth.validFraction<0||record.depth.validFraction>1)issues.push({code:'DEPTH_RANGE',severity:'error',message:'depth validFraction outside [0,1]'});
  if(!record.room.areaM2||record.room.areaM2<=0)issues.push({code:'ROOM_AREA',severity:'error',message:'room area invalid'});
  for(const o of record.objects){if(o.detectionConfidence<0||o.detectionConfidence>1)issues.push({code:'CONF_RANGE',severity:'error',message:`confidence invalid for ${o.id}`});}
  if(record.modalities.length<2)issues.push({code:'MODALITY_LOW',severity:'warning',message:'fewer than two modalities'});
  return issues;
}
