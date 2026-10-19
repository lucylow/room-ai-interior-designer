export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_09:PaletteRecord={id:'ink-brass',name:'Ink Brass',hexes:["#987BF3", "#C9A7CD", "#EB03B7"],temperature:0.65,contrast:0.61,saturation:0.50,bestRooms:["den", "sunroom", "guest-room"],bestStyles:["warm-minimal", "quiet-luxury", "coastal-modern"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_09,hexes:[...PALETTE_09.hexes]};}
