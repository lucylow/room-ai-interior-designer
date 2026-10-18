import { AuthoritativeModel, ConceptElement } from '../core/types';
import { LayoutPlan, ViewMode } from '../planning/types';
export interface SceneNodeVM { id:string; kind:'source'|'concept'|'furniture'|'annotation'|'opening'; label:string; position:{x:number;y:number;z:number}; visible:boolean; selectable:boolean; material?:string; color?:string; }
export interface SceneViewModel { modelId:string; viewMode:ViewMode; camera:{x:number;y:number;z:number;targetX:number;targetY:number;targetZ:number;fov:number}; nodes:SceneNodeVM[]; section?:{axis:'x'|'z'|'y';offset:number;enabled:boolean}; }
export function buildSceneVM(model:AuthoritativeModel,layout?:LayoutPlan,concepts:ConceptElement[]=[],viewMode:ViewMode='perspective'):SceneViewModel{
 const nodes:SceneNodeVM[]=model.features.map(f=>({id:f.id,kind:f.kind==='opening'?'opening':'source',label:f.name||f.id,position:f.center||{x:0,y:0,z:0},visible:true,selectable:true,material:f.materialRef}));
 nodes.push(...concepts.map(c=>({id:c.id,kind:'concept' as const,label:c.semanticType,position:c.transformDelta?.position||{x:0,y:0,z:0},visible:true,selectable:true,material:c.appearance.material,color:c.appearance.color})));
 layout?.placements.forEach(p=>nodes.push({id:`3d-${p.id}`,kind:'furniture',label:p.furnitureId,position:p.position,visible:true,selectable:true}));
 return {modelId:model.id,viewMode,camera:{x:4,y:3.2,z:6,targetX:2.4,targetY:1.1,targetZ:2.1,fov:50},nodes};
}
