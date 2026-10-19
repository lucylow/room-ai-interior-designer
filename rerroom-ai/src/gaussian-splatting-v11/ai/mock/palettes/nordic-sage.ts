export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_02:PaletteRecord={id:'nordic-sage',name:'Nordic Sage',hexes:["#3D4A7C", "#8A92AA", "#C8B686"],temperature:0.30,contrast:0.33,saturation:0.25,bestRooms:["kitchen", "dining-room", "home-office", "bathroom"],bestStyles:["scandinavian", "industrial", "japandi", "mid-century"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_02,hexes:[...PALETTE_02.hexes]};}
