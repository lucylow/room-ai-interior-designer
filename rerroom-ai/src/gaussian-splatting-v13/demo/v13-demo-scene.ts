// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.

import {Scene,Gaussian,Camera,Quat} from '../core/types';
import {seededUnit} from '../core/math';
function q():Quat{return{w:1,x:0,y:0,z:0};}
export function makeV13DemoScene(count=4800):Scene{const gaussians:Gaussian[]=[];for(let i=0;i<count;i++){const x=seededUnit(17,i)*6-3,y=seededUnit(19,i)*2.7,z=seededUnit(23,i)*5-2.5;const semantic=i%11===0?'window':i%13===0?'sofa':i%17===0?'table':i%19===0?'plant':'wall';gaussians.push({id:`g-${i}`,mean:{x,y,z},scale:{x:.025+.035*seededUnit(29,i),y:.02+.03*seededUnit(31,i),z:.02+.03*seededUnit(37,i)},rotation:q(),opacity:.35+.55*seededUnit(41,i),color:{r:.2+.7*seededUnit(43,i),g:.2+.65*seededUnit(47,i),b:.2+.6*seededUnit(53,i)},sh:[.1,.05,.02],confidence:.72+.25*seededUnit(59,i),semantic,material:semantic==='window'?'glass':'paint',sourceFrames:[`frame-${i%96}`],dynamic:false,editable:true});}const camera:Camera={id:'demo-camera',position:{x:0,y:1.5,z:-7},rotation:q(),fx:720,fy:720,cx:480,cy:270,width:960,height:540,near:.05,far:100,timestampMs:0};return{id:'demo-v13-living-room',revision:'v13-demo',gaussians,cameras:[camera],tiles:[],bounds:{min:{x:-3,y:0,z:-2.5},max:{x:3,y:2.7,z:2.5}},metersPerUnit:1,sourceHash:'demo-v13'};}
