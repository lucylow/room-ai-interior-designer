import { VisualInsight, clamp } from '../core/types';
export interface CoachContext { roomId:string; quality:number; confidence:number; style?:string; palette?:string; note?:string; }
export function adviseClientCoach(c:CoachContext):VisualInsight[]{
  const score=clamp(c.quality*0.7+c.confidence*0.3);
  const severity=score<0.45?'critical':score<0.7?'warning':'info';
  return [{id:'client-coach-primary',title:'client guidance',message:c.note||`Improve client while preserving the room structure.`,severity,confidence:score,evidence:[`room=${c.roomId}`,`quality=${c.quality.toFixed(2)}`,`confidence=${c.confidence.toFixed(2)}`]}];
}
