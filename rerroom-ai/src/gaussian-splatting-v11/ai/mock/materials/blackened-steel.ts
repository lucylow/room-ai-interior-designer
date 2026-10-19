export interface MaterialProfile {id:string;name:string;roughness:number;reflectivity:number;warmth:number;styleAffinity:string[];maintenance:number;}
export const MATERIAL_07:MaterialProfile={id:'mat-blackened-steel',name:'blackened-steel',roughness:0.565,reflectivity:0.290,warmth:0.615,styleAffinity:["bohemian", "contemporary", "warm-minimal", "quiet-luxury", "coastal-modern"],maintenance:0.530};
export function materialFit(style:string):number{return MATERIAL_07.styleAffinity.includes(style)?1:0.42;}
