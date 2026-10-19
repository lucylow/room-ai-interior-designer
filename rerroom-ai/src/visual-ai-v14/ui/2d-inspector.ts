import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface TwoDInspectorState { selectedId?:string; active:boolean; status:string; }
export function createTwoDInspectorState():TwoDInspectorState{ return {active:true,status:'ready'}; }
export function summarizeTwoDInspector(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `2d-inspector: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
