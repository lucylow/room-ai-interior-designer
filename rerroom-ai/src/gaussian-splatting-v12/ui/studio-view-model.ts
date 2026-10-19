import { RenderRequest, SplatScene } from '../core/types';
export type StudioTab='capture'|'reconstruct'|'inspect'|'edit'|'stream'|'compare';
export type StudioViewState={tab:StudioTab;sceneId?:string;quality:RenderRequest['quality'];selectedIds:string[];progress:number;status:string};
export class StudioViewModel{private state:StudioViewState={tab:'capture',quality:'balanced',selectedIds:[],progress:0,status:'idle'};set(p:Partial<StudioViewState>){this.state={...this.state,...p};return this.state}select(ids:string[]){return this.set({selectedIds:ids})}hydrate(scene:SplatScene){return this.set({sceneId:scene.id,status:'ready',progress:1})}snapshot(){return this.state}}
