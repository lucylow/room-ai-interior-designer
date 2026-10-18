
import type {ColorPalette} from '../../core/types';
export interface PalettePanelModel {id:string;name:string;description:string;swatches:string[];temperature:string;materialHints:string[];}
export function palettePanel(p:ColorPalette):PalettePanelModel{return {id:p.id,name:p.name,description:p.description,swatches:p.colors.map(c=>c.hex),temperature:p.colors[0]?.temperature??'neutral',materialHints:p.colors.slice(0,4).map(c=>c.name)};}
