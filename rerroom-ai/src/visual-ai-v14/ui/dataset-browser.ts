import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface DatasetBrowserState { selectedId?:string; active:boolean; status:string; }
export function createDatasetBrowserState():DatasetBrowserState{ return {active:true,status:'ready'}; }
export function summarizeDatasetBrowser(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `dataset-browser: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
