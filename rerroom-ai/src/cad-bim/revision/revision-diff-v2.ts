import { DesignOverlay, ConceptElement } from '../core/types';
import { LayoutPlan } from '../planning/types';
export interface RevisionDiffV2 { changed:string[]; added:string[]; removed:string[]; moved:string[]; styled:string[]; layoutMoved:string[]; summary:string; }
function sig(c:ConceptElement){return JSON.stringify({position:c.transformDelta?.position,rotation:c.transformDelta?.rotation,scale:c.transformDelta?.scale,appearance:c.appearance});}
export function diffRevisions(a:DesignOverlay,b:DesignOverlay,aLayout?:LayoutPlan,bLayout?:LayoutPlan):RevisionDiffV2{
 const am=new Map(a.elements.map(e=>[e.id,e])),bm=new Map(b.elements.map(e=>[e.id,e])); const changed:string[]=[],added:string[]=[],removed:string[]=[],moved:string[]=[],styled:string[]=[];
 for(const [id,e] of bm){ if(!am.has(id)) added.push(id); else if(sig(am.get(id)!)!==sig(e)){changed.push(id); if(JSON.stringify(am.get(id)?.transformDelta)!==JSON.stringify(e.transformDelta)) moved.push(id); if(JSON.stringify(am.get(id)?.appearance)!==JSON.stringify(e.appearance)) styled.push(id);} }
 for(const id of am.keys()) if(!bm.has(id)) removed.push(id);
 const la=new Map((aLayout?.placements||[]).map(p=>[p.id,p])); const lb=new Map((bLayout?.placements||[]).map(p=>[p.id,p])); const layoutMoved:string[]=[];
 for(const [id,p] of lb){const prev=la.get(id); if(prev && JSON.stringify(prev.position)!==JSON.stringify(p.position)) layoutMoved.push(id);}
 return {changed,added,removed,moved,styled,layoutMoved,summary:`${added.length} added, ${removed.length} removed, ${changed.length} concept changes, ${layoutMoved.length} layout moves.`};
}
