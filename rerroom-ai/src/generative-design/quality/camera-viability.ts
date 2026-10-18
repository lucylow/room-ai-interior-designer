import type {DesignConcept,RoomContext} from '../core/types';
import {clamp} from '../core/utils';
export const checkCameraViability=(concept:DesignConcept,room:RoomContext)=>{
 const pass=concept.confidence>0.5 && room.measurements.confidence>0.5;
 return {id:'check-camera-viability',pass,score:clamp(concept.confidence*(room.measurements.confidence)),message:pass?'Passed':'Needs review',notes:['This is an AI design-preview check, not a code/building-code certification.']};
};
