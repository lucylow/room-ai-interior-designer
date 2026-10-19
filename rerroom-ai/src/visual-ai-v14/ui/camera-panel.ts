import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface CameraPanelState { selectedId?:string; active:boolean; status:string; }
export function createCameraPanelState():CameraPanelState{ return {active:true,status:'ready'}; }
export function summarizeCameraPanel(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `camera-panel: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
