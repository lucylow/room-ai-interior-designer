import {  AuthoritativeModel, SourceDocument } from '../core/types';
import { detectFileType, requiresServerConversion } from './file-sniffer';
import { DxfImporter } from '../importers/dxf/dxf-importer';
import { ObjImporter } from '../importers/obj/obj-importer';
import { IfcImporter } from '../importers/ifc/ifc-importer';
import { SvgImporter } from '../importers/svg/svg-importer';
import { GltfImporter } from '../importers/gltf/gltf-importer';

export interface ImportRequest { projectId:string; name:string; bytes:Uint8Array; declaredUnit?:string; }
export interface ImportResponse { status:'ready'|'server-conversion-required'|'unsupported'; model?:AuthoritativeModel; message:string; }
export class ImportOrchestrator {
  async import(req:ImportRequest):Promise<ImportResponse>{
    const type=detectFileType(req.name,req.bytes);
    if(requiresServerConversion(type)) return {status:'server-conversion-required',message:`${type.toUpperCase()} import requires a trusted server converter; do not fabricate geometry in the client.`};
    if(type==='unknown') return {status:'unsupported',message:'File type could not be identified.'};
    const document:SourceDocument={id:`doc_${Date.now()}`,name:req.name,fileType:type,byteLength:req.bytes.byteLength,checksum:hashBytes(req.bytes),unitSystem:(req.declaredUnit as any)||'unknown',sourceUnitScaleToMeters:1,importedAt:new Date().toISOString(),coordinateSystem:'canonical-z-up'};
    if(type==='dxf') return {status:'ready',message:'DXF imported.',model:new DxfImporter().parse(req.projectId,document,new TextDecoder().decode(req.bytes))};
    if(type==='obj') return {status:'ready',message:'OBJ imported.',model:new ObjImporter().parse(req.projectId,document,new TextDecoder().decode(req.bytes))};
    if(type==='ifc') return {status:'ready',message:'IFC metadata and spatial anchors imported.',model:new IfcImporter().parse(req.projectId,document,new TextDecoder().decode(req.bytes))};
    if(type==='svg') return {status:'ready',message:'SVG plan imported.',model:new SvgImporter().parse(req.projectId,document,new TextDecoder().decode(req.bytes))};
    return {status:'ready',message:'glTF manifest imported; render geometry remains external.',model:new GltfImporter().parse(req.projectId,document,new TextDecoder().decode(req.bytes))};
  }
}
function hashBytes(bytes:Uint8Array):string{ let h=2166136261; for(const b of bytes){h^=b;h=Math.imul(h,16777619);} return (h>>>0).toString(16).padStart(8,'0'); }
