export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_00:MaterialProfile={id:'mat-oak',name:'oak',roughness:0.250,reflectivity:0.080,warmth:0.300,styleAffinity:["modern", "minimalist", "scandinavian", "industrial", "japandi"],maintenance:0.250};
export function materialFit(style:string):number{return MATERIAL_00.styleAffinity.includes(style)?1:0.42;}
