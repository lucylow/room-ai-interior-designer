export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_06:PaletteRecord={id:'forest',name:'Forest',hexes:["#7166C0", "#AE9EBE", "#DCE2A2"],temperature:0.50,contrast:0.49,saturation:0.39,bestRooms:["entryway", "nursery", "studio", "den"],bestStyles:["organic-modern", "bohemian", "contemporary", "warm-minimal"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_06,hexes:[...PALETTE_06.hexes]};}
