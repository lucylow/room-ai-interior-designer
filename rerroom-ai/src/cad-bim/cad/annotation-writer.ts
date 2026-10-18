import { HandoffDimension } from '../core/types';
export function dimensionAnnotations(dimensions:HandoffDimension[]):string[]{return dimensions.map(d=>`${d.label}: ${d.value} ${d.unit}${d.tolerance?` ± ${d.tolerance}`:''}`).filter(Boolean);}
export function writeAnnotationSvg(dimensions:HandoffDimension[]):string{const rows=dimensionAnnotations(dimensions);const body=rows.map((r,i)=>`<text x="24" y="${32+i*22}" font-family="sans-serif" font-size="16">${escapeXml(r)}</text>`).join('');return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${Math.max(80,rows.length*24+32)}">${body}</svg>`;}
function escapeXml(v:string){return v.replace(/[<>&'"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]!));}
