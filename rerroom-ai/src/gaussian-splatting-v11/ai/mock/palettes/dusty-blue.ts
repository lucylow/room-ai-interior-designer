export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_03:PaletteRecord={id:'dusty-blue',name:'Dusty Blue',hexes:["#4A518D", "#9395AF", "#CDC18D"],temperature:0.35,contrast:0.37,saturation:0.29,bestRooms:["dining-room", "home-office", "bathroom", "entryway"],bestStyles:["industrial", "japandi", "mid-century", "organic-modern"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_03,hexes:[...PALETTE_03.hexes]};}
