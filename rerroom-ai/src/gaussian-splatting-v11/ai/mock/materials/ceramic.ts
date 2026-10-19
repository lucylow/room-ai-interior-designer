export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_09:MaterialProfile={id:'mat-ceramic',name:'ceramic',roughness:0.655,reflectivity:0.350,warmth:0.705,styleAffinity:["warm-minimal", "quiet-luxury", "coastal-modern"],maintenance:0.610};
export function materialFit(style:string):number{return MATERIAL_09.styleAffinity.includes(style)?1:0.42;}
