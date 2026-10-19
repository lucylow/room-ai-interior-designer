import type { ColmapCamera, ColmapDataset, ColmapImage, ColmapPoint3D } from './types';

function clean(lines:string[]):string[]{return lines.map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));}
function nums(s:string):number[]{return s.split(/\s+/).map(Number);}

export function parseCamerasTxt(input:string):ColmapCamera[]{return clean(input.split(/\r?\n/)).map(line=>{const p=line.split(/\s+/);return {id:Number(p[0]),model:p[1],width:Number(p[2]),height:Number(p[3]),params:p.slice(4).map(Number)};});}
export function parseImagesTxt(input:string):ColmapImage[]{const lines=clean(input.split(/\r?\n/));const out:ColmapImage[]=[];for(let i=0;i<lines.length;i+=2){const p=lines[i].split(/\s+/);out.push({id:Number(p[0]),qvec:[Number(p[1]),Number(p[2]),Number(p[3]),Number(p[4])],tvec:[Number(p[5]),Number(p[6]),Number(p[7])],cameraId:Number(p[8]),name:p[9]});}return out;}
export function parsePoints3DTxt(input:string):ColmapPoint3D[]{return clean(input.split(/\r?\n/)).map(line=>{const p=line.split(/\s+/);const tail=p.slice(8).map(Number);const ids:number[]=[];for(let i=0;i<tail.length;i+=2)ids.push(tail[i]);return {id:Number(p[0]),xyz:[Number(p[1]),Number(p[2]),Number(p[3])],rgb:[Number(p[4]),Number(p[5]),Number(p[6])],error:Number(p[7]),imageIds:ids};});}
export function parseDataset(cameras:string,images:string,points:string):ColmapDataset{return {cameras:parseCamerasTxt(cameras),images:parseImagesTxt(images),points:parsePoints3DTxt(points)};}
