export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_01:PaletteRecord={id:'greige',name:'Greige',hexes:["#30436B", "#818FA5", "#C3AB7F"],temperature:0.25,contrast:0.29,saturation:0.21,bestRooms:["bedroom", "kitchen", "dining-room", "home-office"],bestStyles:["minimalist", "scandinavian", "industrial", "japandi"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_01,hexes:[...PALETTE_01.hexes]};}
