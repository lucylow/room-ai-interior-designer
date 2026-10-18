
import type {CameraPlan,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface RenderMood {id:string;label:string;lighting:string;cameraHint:string;contrast:number;warmth:number;notes:string[];}
export const mood:RenderMood={id:'gallery',label:'gallery',lighting:'clean directional accents and neutral base lighting',cameraHint:'Use a stable architectural camera, preserve perspective, and keep openings visible.',contrast :0.72,warmth :0.35,notes:['Preserve source geometry','Keep material colors readable','Avoid blown highlights']};
export function evaluategallery(room:RoomContext):CreativeSignal[]{const score=clamp(room.naturalLightScore*.45+room.visualBalanceScore*.25+mood.contrast*.15+mood.warmth*.15);return [{id:'mood-gallery',label:'Render mood fit',score,confidence:.74,source:'render-mood',explanation:`clean directional accents and neutral base lighting works with the room's existing light signal.`},{id:'mood-gallery-warmth',label:'Mood warmth',score:clamp(.5+mood.warmth*.4),confidence:.7,source:'render-mood',explanation:'Warmth is treated as a controlled visual parameter.'}];}
export function cameraForgallery(room:RoomContext):CameraPlan{return {id:'camera-gallery',label:'gallery view',position:{x:room.measurements.widthM*.45,y:room.measurements.ceilingM*.48,z:room.measurements.depthM*.2},target:{x:room.measurements.widthM*.5,y:room.measurements.ceilingM*.42,z:room.measurements.depthM*.58},lensMm:35,crop:'wide',reason:'Stable comparison camera for iterative creative revisions.'};}
