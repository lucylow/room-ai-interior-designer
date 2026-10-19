export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_02:MaterialProfile={id:'mat-white-oak',name:'white-oak',roughness:0.340,reflectivity:0.140,warmth:0.390,styleAffinity:["scandinavian", "industrial", "japandi", "mid-century", "organic-modern"],maintenance:0.330};
export function materialFit(style:string):number{return MATERIAL_02.styleAffinity.includes(style)?1:0.42;}
