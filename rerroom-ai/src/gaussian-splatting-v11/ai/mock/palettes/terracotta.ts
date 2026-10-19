export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_08:PaletteRecord={id:'terracotta',name:'Terracotta',hexes:["#8B74E2", "#C0A4C8", "#E6F8B0"],temperature:0.60,contrast:0.57,saturation:0.46,bestRooms:["studio", "den", "sunroom", "guest-room"],bestStyles:["contemporary", "warm-minimal", "quiet-luxury", "coastal-modern"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_08,hexes:[...PALETTE_08.hexes]};}
