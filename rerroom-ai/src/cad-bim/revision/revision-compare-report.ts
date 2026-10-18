import { LayoutPlan } from '../planning/types';
import { compareScenes } from '../visualization/scene-compare-controller';

export interface RevisionReport { id:string; title:string; changedCount:number; categories:{moves:number;rotations:number;added:number;removed:number}; beforeScore:number; afterScore:number; summary:string[]; approvalNotes:string[]; }
export function buildRevisionCompareReport(before:LayoutPlan,after:LayoutPlan,title='Layout revision'):RevisionReport{
 const diff=compareScenes(before,after); const categories={moves:diff.moved.length,rotations:diff.rotated.length,added:diff.placementAdded.length,removed:diff.placementRemoved.length};
 const scoreDelta=after.score-before.score; const summary=[`${diff.changedCount} placement changes detected`,`Layout score changed by ${(scoreDelta*100).toFixed(1)} points`,after.circulationScore>=before.circulationScore?'Circulation score maintained or improved':'Circulation score decreased'];
 const approvalNotes:string[]=[]; if(categories.removed) approvalNotes.push('Confirm removed furniture is acceptable.'); if(categories.moves) approvalNotes.push('Review clearance around moved items.'); if(after.confidence<.8) approvalNotes.push('Review lower-confidence recommendations before approval.');
 return {id:`revision-report-${before.id}-${after.id}`,title,changedCount:diff.changedCount,categories,beforeScore:before.score,afterScore:after.score,summary,approvalNotes};
}
