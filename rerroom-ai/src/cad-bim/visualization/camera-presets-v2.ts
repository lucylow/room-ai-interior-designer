import { SceneViewModel } from './scene-view-model';
export interface CameraPreset { id:string; name:string; camera:SceneViewModel['camera']; lensHint:string; purpose:'plan'|'hero'|'entry'|'detail'|'section'|'walkthrough'; }
export const cameraPresets:CameraPreset[]=[
 {id:'hero',name:'Hero Perspective',camera:{x:4.8,y:2.3,z:6.4,targetX:2.4,targetY:1.1,targetZ:2.1,fov:48},lensHint:'wide architectural',purpose:'hero'},
 {id:'entry',name:'Entry View',camera:{x:1.1,y:1.7,z:5.8,targetX:2.6,targetY:1.0,targetZ:2.3,fov:52},lensHint:'human eye',purpose:'entry'},
 {id:'detail',name:'Furniture Detail',camera:{x:3.1,y:1.3,z:3.5,targetX:2.5,targetY:.8,targetZ:2.6,fov:40},lensHint:'normal',purpose:'detail'},
 {id:'section-x',name:'Section X',camera:{x:2.4,y:3.8,z:8.5,targetX:2.4,targetY:1.3,targetZ:2.1,fov:45},lensHint:'orthographic-ready',purpose:'section'},
 {id:'walkthrough',name:'Walkthrough Start',camera:{x:.7,y:1.6,z:.8,targetX:2.6,targetY:1.5,targetZ:3.2,fov:70} ,lensHint:'first person',purpose:'walkthrough'}
];
export function applyPreset(scene:SceneViewModel,preset:CameraPreset):SceneViewModel{return {...scene,camera:{...preset.camera}};}
