import {DatasetRecord} from '../core/types';
export function ShadowAugment(record:DatasetRecord, strength=0.5):DatasetRecord {
  const s=Math.max(0,Math.min(1,strength));
  return {...record,version:`20.0.0-aug-shadow`,hardCase:{
    tags:[...(record.hardCase?.tags||[]),'shadow'],severity:Math.max(record.hardCase?.severity||0,s),
    notes:[...(record.hardCase?.notes||[]),'hard shadow metadata']
  },camera:{...record.camera,motionBlur:Math.min(1,record.camera.motionBlur+.15*s),exposure:Math.max(.2,Math.min(1.4,record.camera.exposure*(.8+.4*s)))}};
}
