export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_10:PaletteRecord={id:'soft-black',name:'Soft Black',hexes:["#A58204", "#D2AAD2", "#F00EBE"],temperature:0.70,contrast:0.65,saturation:0.53,bestRooms:["sunroom", "guest-room"],bestStyles:["quiet-luxury", "coastal-modern"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_10,hexes:[...PALETTE_10.hexes]};}
