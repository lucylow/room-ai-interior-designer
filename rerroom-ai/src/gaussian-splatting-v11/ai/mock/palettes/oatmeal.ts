export interface PaletteRecord {id:string;name:string;hexes:string[];temperature:number;contrast:number;saturation:number;bestRooms:string[];bestStyles:string[];}
export const PALETTE_11:PaletteRecord={id:'oatmeal',name:'Oatmeal',hexes:["#B28915", "#DBADD7", "#F519C5"],temperature:0.75,contrast:0.69,saturation:0.56,bestRooms:["guest-room"],bestStyles:["coastal-modern"]};
export function paletteVariation(_seed:number):PaletteRecord{return {...PALETTE_11,hexes:[...PALETTE_11.hexes]};}
