import type { Gaussian3D, SceneQuery, SceneQueryResult } from '../core/types';
import { vec3 } from '../math/vec3';

export class GaussianQueryEngine {
  constructor(private splats:Gaussian3D[]){ }
  query(q:SceneQuery):SceneQueryResult[]{const tokens=q.text.toLowerCase().split(/\W+/).filter(Boolean);return this.splats.map(g=>{const label=(g.semanticLabel||'').toLowerCase();const material=(g.materialClass||'').toLowerCase();let relevance=0;for(const t of tokens){if(label.includes(t))relevance+=0.45;if(material.includes(t))relevance+=0.25;}if(q.semanticLabels?.includes(g.semanticLabel||''))relevance+=0.35;if(q.materialClasses?.includes(g.materialClass||''))relevance+=0.2;const distance=vec3.len(g.mean);return {splatId:g.id,relevance:Math.min(1,relevance),distance,confidence:g.confidence,rationale:`matched ${label||'unlabeled'}${material?` / ${material}`:''}`};}).filter(x=>x.relevance>0&&x.confidence>=q.minConfidence).sort((a,b)=>b.relevance-a.relevance||a.distance-b.distance).slice(0,q.maxResults);}
}
