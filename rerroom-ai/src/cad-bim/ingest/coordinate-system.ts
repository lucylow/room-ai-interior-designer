import { Vec3 } from '../core/types';
export type CoordinatePreset='cad-xy-zup'|'y-up'|'z-up'|'unknown';
export interface CoordinateTransform { from:CoordinatePreset; to:'canonical-z-up'; apply:(v:Vec3)=>Vec3; }
export function getCoordinateTransform(preset:CoordinatePreset):CoordinateTransform {
  if(preset==='cad-xy-zup'||preset==='z-up') return {from:preset,to:'canonical-z-up',apply:v=>({...v})};
  if(preset==='y-up') return {from:preset,to:'canonical-z-up',apply:v=>({x:v.x,y:v.z,z:-v.y})};
  return {from:preset,to:'canonical-z-up',apply:v=>({...v})};
}
export function inferCoordinatePreset(header:string):CoordinatePreset { const h=header.toLowerCase(); if(h.includes('up-axis')&&h.includes('y')) return 'y-up'; if(h.includes('z-up')||h.includes('elevation')) return 'z-up'; return 'cad-xy-zup'; }
