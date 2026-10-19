import { FrameRecord } from '../core/types';
import { advise } from '../ai/capture-advisor';
export class CaptureCoachViewModel{private advice=advise([] as FrameRecord[]);refresh(frames:FrameRecord[]){this.advice=advise(frames);return this.advice}top(){return this.advice[0]}}
