import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface BenchmarkPanelState { selectedId?:string; active:boolean; status:string; }
export function createBenchmarkPanelState():BenchmarkPanelState{ return {active:true,status:'ready'}; }
export function summarizeBenchmarkPanel(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `benchmark-panel: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
