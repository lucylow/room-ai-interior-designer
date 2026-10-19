export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_08:MaterialProfile={id:'mat-brass',name:'brass',roughness:0.610,reflectivity:0.320,warmth:0.660,styleAffinity:["contemporary", "warm-minimal", "quiet-luxury", "coastal-modern"],maintenance:0.570};
export function materialFit(style:string):number{return MATERIAL_08.styleAffinity.includes(style)?1:0.42;}
