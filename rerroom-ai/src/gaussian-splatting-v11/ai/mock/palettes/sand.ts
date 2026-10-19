export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_07:PaletteRecord={id:'sand',name:'Sand',hexes:["#7E6DD1", "#B7A1C3", "#E1EDA9"],temperature:0.55,contrast:0.53,saturation:0.43,bestRooms:["nursery", "studio", "den", "sunroom"],bestStyles:["bohemian", "contemporary", "warm-minimal", "quiet-luxury"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_07,hexes:[...PALETTE_07.hexes]};}
