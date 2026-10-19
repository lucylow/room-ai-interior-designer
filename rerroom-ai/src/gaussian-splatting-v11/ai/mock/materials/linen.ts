export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_05:MaterialProfile={id:'mat-linen',name:'linen',roughness:0.475,reflectivity:0.230,warmth:0.525,styleAffinity:["mid-century", "organic-modern", "bohemian", "contemporary", "warm-minimal"],maintenance:0.450};
export function materialFit(style:string):number{return MATERIAL_05.styleAffinity.includes(style)?1:0.42;}
