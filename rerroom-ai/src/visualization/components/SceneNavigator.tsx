import React from 'react';
import type { SceneObject, SpatialScene } from '../core/types';

export function SceneNavigator({ scene, selectedId, onSelect }: { scene: SpatialScene; selectedId?: string; onSelect?: (id:string)=>void }) {
  const groups=new Map<string,SceneObject[]>();
  for(const object of scene.objects.filter(item=>item.visible)){
    const list=groups.get(object.type) ?? [];
    list.push(object);
    groups.set(object.type,list);
  }
  return (
    <nav aria-label="Scene object navigator" style={{ padding:12, background:'#FFF', border:'1px solid #E2E3E8', borderRadius:12, maxHeight:420, overflow:'auto' }}>
      <strong>Scene</strong>
      {Array.from(groups.entries()).map(([type,objects])=>(
        <div key={type} style={{marginTop:12}}>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.08em',color:'#737985'}}>{type}</div>
          {objects.map(object=>(
            <button
              key={object.id}
              type="button"
              aria-current={selectedId===object.id}
              onClick={()=>onSelect?.(object.id)}
              style={{
                display:'flex',width:'100%',justifyContent:'space-between',marginTop:5,
                padding:'8px 9px',borderRadius:8,
                border:`1px solid ${selectedId===object.id?'#4F5BFF':'#E2E3E8'}`,
                background:selectedId===object.id?'#EEF0FF':'#FFF',
              }}
            >
              <span>{object.label}</span>
              <span style={{fontSize:11,color:'#7A7F8A'}}>{object.locked?'locked':'edit'}</span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}
