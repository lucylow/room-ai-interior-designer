export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_10:MaterialProfile={id:'mat-rattan',name:'rattan',roughness:0.700,reflectivity:0.380,warmth:0.750,styleAffinity:["quiet-luxury", "coastal-modern"],maintenance:0.650};
export function materialFit(style:string):number{return MATERIAL_10.styleAffinity.includes(style)?1:0.42;}
