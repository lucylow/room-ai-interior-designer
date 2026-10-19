import type { Gaussian3D } from '../core/types';

export class SemanticSplatIndex {
  private labels=new Map<string,Set<string>>();
  private materials=new Map<string,Set<string>>();
  index(splats:Gaussian3D[]):void {
    this.labels.clear();this.materials.clear();
    for(const s of splats){
      if(s.semanticLabel){if(!this.labels.has(s.semanticLabel))this.labels.set(s.semanticLabel,new Set());this.labels.get(s.semanticLabel)!.add(s.id);}
      if(s.materialClass){if(!this.materials.has(s.materialClass))this.materials.set(s.materialClass,new Set());this.materials.get(s.materialClass)!.add(s.id);}
    }
  }
  idsForLabel(label:string):string[]{return [...(this.labels.get(label)||new Set())];}
  idsForMaterial(material:string):string[]{return [...(this.materials.get(material)||new Set())];}
  labelsList():string[]{return [...this.labels.keys()].sort();}
}
