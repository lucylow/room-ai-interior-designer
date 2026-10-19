import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface CrossModalPanelState { selectedId?:string; active:boolean; status:string; }
export function createCrossModalPanelState():CrossModalPanelState{ return {active:true,status:'ready'}; }
export function summarizeCrossModalPanel(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `cross-modal-panel: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
