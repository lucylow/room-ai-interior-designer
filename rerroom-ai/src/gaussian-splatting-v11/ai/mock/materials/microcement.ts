export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_04:MaterialProfile={id:'mat-microcement',name:'microcement',roughness:0.430,reflectivity:0.200,warmth:0.480,styleAffinity:["japandi", "mid-century", "organic-modern", "bohemian", "contemporary"],maintenance:0.410};
export function materialFit(style:string):number{return MATERIAL_04.styleAffinity.includes(style)?1:0.42;}
