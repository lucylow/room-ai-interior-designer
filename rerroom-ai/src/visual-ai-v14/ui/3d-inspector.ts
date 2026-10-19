import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface ThreeDInspectorState { selectedId?:string; active:boolean; status:string; }
export function createThreeDInspectorState():ThreeDInspectorState{ return {active:true,status:'ready'}; }
export function summarizeThreeDInspector(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `3d-inspector: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
