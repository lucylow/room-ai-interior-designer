import { CADFileType } from '../core/types';

const EXTENSIONS:Record<string,CADFileType>={'.dxf':'dxf','.dwg':'dwg','.obj':'obj','.svg':'svg','.gltf':'gltf','.glb':'glb','.ifc':'ifc','.step':'step','.stp':'stp'};
export function detectFileType(name:string, bytes?:Uint8Array):CADFileType {
  const dot=name.toLowerCase().lastIndexOf('.'); const ext=dot>=0?name.slice(dot):''; if(EXTENSIONS[ext]) return EXTENSIONS[ext];
  if(bytes){ const head=new TextDecoder().decode(bytes.slice(0,512)); if(head.includes('SECTION')&&head.includes('ENTITIES')) return 'dxf'; if(head.includes('ISO-10303')||head.includes('IFCWALL')) return 'ifc'; if(head.trimStart().startsWith('{')&&head.includes('asset')) return 'gltf'; if(head.includes('solid ')||head.includes('v ')) return 'obj'; }
  return 'unknown';
}
export function canImportToSpatialModel(type:CADFileType):boolean { return ['dxf','obj','svg','gltf','glb','ifc','step','stp'].includes(type); }
export function requiresServerConversion(type:CADFileType):boolean { return type==='dwg'||type==='step'||type==='stp'; }
