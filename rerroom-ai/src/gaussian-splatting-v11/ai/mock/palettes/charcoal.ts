export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_05:PaletteRecord={id:'charcoal',name:'Charcoal',hexes:["#645FAF", "#A59BB9", "#D7D79B"],temperature:0.45,contrast:0.45,saturation:0.35,bestRooms:["bathroom", "entryway", "nursery", "studio"],bestStyles:["mid-century", "organic-modern", "bohemian", "contemporary"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_05,hexes:[...PALETTE_05.hexes]};}
