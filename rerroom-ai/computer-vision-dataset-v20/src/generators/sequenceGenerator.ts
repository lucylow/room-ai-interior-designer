import {SceneGenerator} from './sceneGenerator';
import {DatasetRecord} from '../core/types';
export function generateSequence(sceneGenerator:SceneGenerator,start:number,length:number,split:DatasetRecord['split']){const out:DatasetRecord[]=[];for(let i=0;i<length;i++)out.push(sceneGenerator.generate(start+i,split));return out;}
