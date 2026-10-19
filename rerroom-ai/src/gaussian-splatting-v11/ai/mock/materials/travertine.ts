export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_03:MaterialProfile={id:'mat-travertine',name:'travertine',roughness:0.385,reflectivity:0.170,warmth:0.435,styleAffinity:["industrial", "japandi", "mid-century", "organic-modern", "bohemian"],maintenance:0.370};
export function materialFit(style:string):number{return MATERIAL_03.styleAffinity.includes(style)?1:0.42;}
