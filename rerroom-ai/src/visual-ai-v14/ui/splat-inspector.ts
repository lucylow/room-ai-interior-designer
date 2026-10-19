import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface SplatInspectorState { selectedId?:string; active:boolean; status:string; }
export function createSplatInspectorState():SplatInspectorState{ return {active:true,status:'ready'}; }
export function summarizeSplatInspector(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `splat-inspector: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
