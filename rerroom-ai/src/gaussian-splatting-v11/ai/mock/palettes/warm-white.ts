export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_00:PaletteRecord={id:'warm-white',name:'Warm White',hexes:["#233C5A", "#788CA0", "#BEA078"],temperature:0.20,contrast:0.25,saturation:0.18,bestRooms:["living-room", "bedroom", "kitchen", "dining-room"],bestStyles:["modern", "minimalist", "scandinavian", "industrial"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_00,hexes:[...PALETTE_00.hexes]};}
