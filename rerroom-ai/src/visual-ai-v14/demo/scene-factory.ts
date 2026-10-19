import { SceneTwoD, SceneThreeD, CameraState, Splat, FurnitureTwoD, FloorplanSegment } from '../core/types';
export function makeDemoTwoD(roomId='demo-living'):SceneTwoD{
 const segments:FloorplanSegment[]=[{id:'w1',a:{x:0,y:0},b:{x:6,y:0},class:'wall',confidence:.98},{id:'w2',a:{x:6,y:0},b:{x:6,y:4},class:'wall',confidence:.97},{id:'d1',a:{x:2,y:4},b:{x:3,y:4},class:'door',confidence:.94},{id:'win1',a:{x:4,y:0},b:{x:5.8,y:0},class:'window',confidence:.99}];
 const furniture:FurnitureTwoD[]=[{id:'sofa',role:'seating',center:{x:3,y:2.8},size:{w:2.4,d:0.95},rotation:0,style:'scandinavian'},{id:'table',role:'coffee-table',center:{x:3,y:1.8},size:{w:1.1,d:.6},rotation:0,style:'minimalist'},{id:'chair',role:'accent-seating',center:{x:4.8,y:2.5},size:{w:.8,d:.8},rotation:.2,style:'modern'}];
 return {id:roomId,width:6,height:4,segments,furniture};
}
export function makeDemoThreeD(roomId='demo-living'):SceneThreeD{
 const splats:Splat[]=[]; for(let i=0;i<4800;i++){ const x=((i*37)%600)/100-3, y=((i*71)%300)/100, z=((i*53)%400)/100; splats.push({id:`s-${i}`,mean:{x,y,z},scale:{x:.025,y:.025,z:.025},opacity:.6+(i%20)/100,color:{r:(i*13)%255,g:(i*23)%255,b:(i*31)%255,a:1},semantic:i%10<4?'wall':i%17===0?'window':i%13===0?'furniture':'surface',material:i%5===0?'wood':i%7===0?'fabric':'paint',confidence:.65+(i%30)/100}); }
 const camera:CameraState={position:{x:7,y:4.6,z:7},target:{x:3,y:1.4,z:2},up:{x:0,y:1,z:0},fov:48,near:.05,far:50,aspect:16/9};
 return {id:roomId,bounds:{min:{x:0,y:0,z:0},max:{x:6,y:3,z:4}},splats,camera,semanticLabels:{wall:1920,window:280,furniture:410,surface:2190}};
}
