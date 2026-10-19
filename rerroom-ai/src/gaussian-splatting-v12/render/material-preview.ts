import { Color } from '../core/types';
export type MaterialPreview={id:string;label:string;baseColor:Color;roughness:number;metallic:number;emission:number;semantic:string};
export function materialRegistry():MaterialPreview[]{return[
{id:'oak-natural',label:'Natural Oak',baseColor:{r:.63,g:.45,b:.28},roughness:.48,metallic:.02,emission:0,semantic:'wood'},
{id:'walnut',label:'Walnut',baseColor:{r:.28,g:.14,b:.08},roughness:.4,metallic:.01,emission:0,semantic:'wood'},
{id:'linen',label:'Linen',baseColor:{r:.78,g:.74,b:.66},roughness:.82,metallic:0,emission:0,semantic:'fabric'},
{id:'matte-black',label:'Matte Black',baseColor:{r:.02,g:.02,b:.025},roughness:.65,metallic:.08,emission:0,semantic:'metal'},
{id:'brass',label:'Brushed Brass',baseColor:{r:.58,g:.4,b:.13},roughness:.28,metallic:.8,emission:0,semantic:'metal'},
{id:'sage',label:'Sage Paint',baseColor:{r:.39,g:.48,b:.36},roughness:.76,metallic:0,emission:0,semantic:'paint'}]}
export function shade(c:Color,lighting:number,material:MaterialPreview):Color{return{r:Math.min(1,c.r*material.baseColor.r*lighting*2),g:Math.min(1,c.g*material.baseColor.g*lighting*2),b:Math.min(1,c.b*material.baseColor.b*lighting*2),a:c.a}}
