import { LayoutPlan } from '../planning/types';
export interface LayoutComparison { planA:string; planB:string; scoreDelta:number; placementDelta:number; commonFurniture:string[]; onlyA:string[]; onlyB:string[]; notes:string[]; }
export function compareLayouts(a:LayoutPlan,b:LayoutPlan):LayoutComparison{
 const aa=a.placements.map(p=>p.furnitureId),bb=b.placements.map(p=>p.furnitureId); const common=aa.filter(id=>bb.includes(id));
 return {planA:a.id,planB:b.id,scoreDelta:b.score-a.score,placementDelta:b.placements.length-a.placements.length,commonFurniture:[...new Set(common)],onlyA:aa.filter(id=>!bb.includes(id)),onlyB:bb.filter(id=>!aa.includes(id)),notes:[b.circulationScore>a.circulationScore?'B improves circulation.':'A has equal or better circulation.',b.styleScore>a.styleScore?'B is more style-aligned.':'A is at least as style-aligned.']};
}
