export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_06:MaterialProfile={id:'mat-boucle',name:'boucle',roughness:0.520,reflectivity:0.260,warmth:0.570,styleAffinity:["organic-modern", "bohemian", "contemporary", "warm-minimal", "quiet-luxury"],maintenance:0.490};
export function materialFit(style:string):number{return MATERIAL_06.styleAffinity.includes(style)?1:0.42;}
