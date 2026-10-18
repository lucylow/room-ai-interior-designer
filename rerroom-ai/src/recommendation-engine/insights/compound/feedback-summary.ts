import type {Feedback} from '../../core/types';
export const feedbackSummary=(rows:Feedback[])=>{const counts={accepted:0,rejected:0,saved:0,edited:0,ignored:0,snoozed:0};for(const r of rows)counts[r.action]++;const total=rows.length;return {counts,total,positiveRate:total?(counts.accepted+counts.saved+counts.edited)/total:0,negativeRate:total?counts.rejected/total:0};};
