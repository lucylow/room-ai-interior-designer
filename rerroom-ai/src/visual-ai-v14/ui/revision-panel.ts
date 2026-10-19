import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface RevisionPanelState { selectedId?:string; active:boolean; status:string; }
export function createRevisionPanelState():RevisionPanelState{ return {active:true,status:'ready'}; }
export function summarizeRevisionPanel(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `revision-panel: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
