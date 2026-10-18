import { AuthoritativeModel, SourceDocument, SourceFeature, SourceLevel, Polygon2 } from '../../core/types';
import { v2 } from '../../core/geometry';

interface Pair { code:string; value:string; }
export class DxfImporter {
  parse(projectId:string,doc:SourceDocument,text:string):AuthoritativeModel {
    const pairs=this.parsePairs(text); const features:SourceFeature[]=[]; const levels:SourceLevel[]=[]; let i=0;
    while(i<pairs.length){
      if(pairs[i].code==='0' && pairs[i].value==='LINE'){ const p=this.readLine(pairs,i); if(p){features.push(p.feature); i=p.next; continue;} }
      if(pairs[i].code==='0' && pairs[i].value==='LWPOLYLINE'){ const p=this.readPolyline(pairs,i); if(p){features.push(p.feature); i=p.next; continue;} }
      if(pairs[i].code==='0' && pairs[i].value==='CIRCLE'){ const p=this.readCircle(pairs,i); if(p){features.push(p.feature); i=p.next; continue;} }
      i++;
    }
    features.forEach(f=>f.sourceDocumentId=doc.id); const modelId=`model_${doc.id}`; const immutable=this.hash(JSON.stringify(features)); return {id:modelId,projectId,document:doc,features,levels,dimensions:{},anchors:features.map(f=>({sourceDocumentId:doc.id,sourceFeatureId:f.id,confidence:1})),importedRevision:doc.revision||'source-1',immutableGeometryHash:immutable};
  }
  private parsePairs(text:string):Pair[]{ const lines=text.replace(/\r/g,'').split('\n'); const out:Pair[]=[]; for(let i=0;i<lines.length-1;i+=2){ const code=lines[i].trim(); if(code==='') continue; out.push({code,value:lines[i+1].trim()}); } return out; }
  private readLine(pairs:Pair[],start:number){ let x1=0,y1=0,z1=0,x2=0,y2=0,z2=0,layer='0'; for(let i=start+1;i<Math.min(start+30,pairs.length);i++){ const p=pairs[i]; if(p.code==='0') break; if(p.code==='8') layer=p.value; if(p.code==='10') x1=+p.value; if(p.code==='20') y1=+p.value; if(p.code==='30') z1=+p.value; if(p.code==='11') x2=+p.value; if(p.code==='21') y2=+p.value; if(p.code==='31') z2=+p.value; }
    const id=`dxf_line_${start}`; const feature:SourceFeature={id,sourceDocumentId:'',kind:layer.toLowerCase().includes('wall')?'wall':'other',layer,authority:'authoritative',center:{x:(x1+x2)/2,y:(y1+y2)/2,z:(z1+z2)/2},properties:{startX:x1,startY:y1,endX:x2,endY:y2},sourceRefs:[`PAIR:${start}`]}; return {feature,next:start+20}; }
  private readPolyline(pairs:Pair[],start:number){ let layer='0'; const pts: {x:number,y:number}[]=[]; let x:number|undefined; for(let i=start+1;i<Math.min(start+200,pairs.length);i++){ const p=pairs[i]; if(p.code==='0') break; if(p.code==='8') layer=p.value; if(p.code==='10'){x=+p.value;} if(p.code==='20'&&x!==undefined){pts.push(v2(x,+p.value));x=undefined;} } if(pts.length<2) return null; const kind=layer.toLowerCase().includes('wall')?'wall':layer.toLowerCase().includes('door')?'door':'other'; const feature:SourceFeature={id:`dxf_poly_${start}`,sourceDocumentId:'',kind,layer,authority:'authoritative',geometry2d:{points:pts},properties:{vertexCount:pts.length},sourceRefs:[`PAIR:${start}`]}; return {feature,next:start+pts.length*3+4}; }
  private readCircle(pairs:Pair[],start:number){ let cx=0,cy=0,cz=0,r=0,layer='0'; for(let i=start+1;i<Math.min(start+25,pairs.length);i++){ const p=pairs[i]; if(p.code==='0') break; if(p.code==='8') layer=p.value; if(p.code==='10') cx=+p.value; if(p.code==='20') cy=+p.value; if(p.code==='30') cz=+p.value; if(p.code==='40') r=+p.value; } const feature:SourceFeature={id:`dxf_circle_${start}`,sourceDocumentId:'',kind:'other',layer,authority:'authoritative',center:{x:cx,y:cy,z:cz},size:{width:r*2,depth:r*2,height:0},properties:{radius:r},sourceRefs:[`PAIR:${start}`]}; return {feature,next:start+15}; }
  private hash(s:string):string{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
}
