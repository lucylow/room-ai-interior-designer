export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_11:MaterialProfile={id:'mat-glass',name:'glass',roughness:0.745,reflectivity:0.410,warmth:0.795,styleAffinity:["coastal-modern"],maintenance:0.690};
export function materialFit(style:string):number{return MATERIAL_11.styleAffinity.includes(style)?1:0.42;}
