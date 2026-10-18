import { AuthoritativeModel, SourceFeature } from '../core/types';
export class FeatureRegistry {
  private byId=new Map<string,SourceFeature>(); private byExternal=new Map<string,SourceFeature>();
  constructor(model:AuthoritativeModel){for(const f of model.features){this.byId.set(f.id,f);if(f.externalId)this.byExternal.set(f.externalId,f);}}
  get(id:string){return this.byId.get(id);}
  getByExternal(id:string){return this.byExternal.get(id);}
  byKind(kind:SourceFeature['kind']):SourceFeature[]{return [...this.byId.values()].filter(f=>f.kind===kind);}
  all():SourceFeature[]{return [...this.byId.values()];}
}
