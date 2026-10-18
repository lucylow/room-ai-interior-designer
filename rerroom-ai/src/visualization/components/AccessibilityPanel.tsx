import React from 'react';
import { prefersReducedMotion } from '../three-d/accessibility';

export interface AccessibilityPanelProps {
  reducedMotion: boolean;
  showLabels: boolean;
  highContrast: boolean;
  onChange: (patch: Partial<{reducedMotion:boolean;showLabels:boolean;highContrast:boolean}>)=>void;
}

export function AccessibilityPanel({ reducedMotion, showLabels, highContrast, onChange }: AccessibilityPanelProps) {
  const systemReduced=prefersReducedMotion();
  return (
    <section aria-label="Visualization accessibility" style={{padding:14,background:'#FFF',border:'1px solid #E2E3E8',borderRadius:14}}>
      <h3 style={{margin:'0 0 10px'}}>Accessibility</h3>
      <label style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
        <input type="checkbox" checked={reducedMotion} onChange={event=>onChange({reducedMotion:event.target.checked})}/>
        Reduce motion {systemReduced?'(system preference detected)':''}
      </label>
      <label style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
        <input type="checkbox" checked={showLabels} onChange={event=>onChange({showLabels:event.target.checked})}/>
        Always show object labels
      </label>
      <label style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
        <input type="checkbox" checked={highContrast} onChange={event=>onChange({highContrast:event.target.checked})}/>
        High contrast selection outlines
      </label>
      <p style={{fontSize:12,color:'#6D7280',lineHeight:1.5}}>
        The 3D scene remains navigable with a companion object list and the 2D plan remains available as a non-WebGL fallback.
      </p>
    </section>
  );
}
