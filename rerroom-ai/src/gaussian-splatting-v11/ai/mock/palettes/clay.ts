export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_04:PaletteRecord={id:'clay',name:'Clay',hexes:["#57589E", "#9C98B4", "#D2CC94"],temperature:0.40,contrast:0.41,saturation:0.32,bestRooms:["home-office", "bathroom", "entryway", "nursery"],bestStyles:["japandi", "mid-century", "organic-modern", "bohemian"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_04,hexes:[...PALETTE_04.hexes]};}
