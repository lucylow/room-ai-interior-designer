import { DatasetRecord, SceneTwoD, SceneThreeD } from '../core/types';
export interface StyleFilterState { selectedId?:string; active:boolean; status:string; }
export function createStyleFilterState():StyleFilterState{ return {active:true,status:'ready'}; }
export function summarizeStyleFilter(x:{records?:DatasetRecord[];scene2d?:SceneTwoD;scene3d?:SceneThreeD}):string{ return `style-filter: ${x.records?.length??0} records / ${x.scene2d?.furniture.length??0} TwoD objects / ${x.scene3d?.splats.length??0} splats`; }
