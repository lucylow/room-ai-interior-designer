import type {Recommendation,RoomContext} from '../../core/types';
export const colorConsistency=(room:RoomContext,recs:Recommendation[])=>{const preferred=Object.entries(room.colorSignals).filter(([,v])=>v>.5).map(([k])=>k);return recs.map(r=>{const overlap=r.tags.filter(t=>preferred.includes(t)).length;const score=Math.min(1,.82+overlap*.06);return {recommendationId:r.id,score,overlap};});};
