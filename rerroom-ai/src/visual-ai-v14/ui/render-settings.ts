import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface RenderSettingsState { selectedId?:string; active:boolean; status:string; }
export function createRenderSettingsState():RenderSettingsState{ return {active:true,status:'ready'}; }
export function summarizeRenderSettings(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `render-settings: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
