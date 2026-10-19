export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_01:MaterialProfile={id:'mat-walnut',name:'walnut',roughness:0.295,reflectivity:0.110,warmth:0.345,styleAffinity:["minimalist", "scandinavian", "industrial", "japandi", "mid-century"],maintenance:0.290};
export function materialFit(style:string):number{return MATERIAL_01.styleAffinity.includes(style)?1:0.42;}
