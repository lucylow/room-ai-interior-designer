import type {CatalogItem,RoomContext} from '../core/types';
export const dimensionMatch=(item:CatalogItem,room:RoomContext)=>{const scale=Math.min(room.measurements.widthM,room.measurements.depthM);const footprint=item.dimensions.width*item.dimensions.depth;const budget=scale*scale*.28;return Math.max(0,Math.min(1,1-Math.max(0,footprint-budget)/Math.max(.1,budget)));};
