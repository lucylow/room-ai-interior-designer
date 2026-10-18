import { HandoffDimension } from '../core/types';
export function writeDxfAnnotations(dimensions:HandoffDimension[]):string{
  const lines=['0','SECTION','2','ENTITIES']; let y=0; for(const d of dimensions){lines.push('0','TEXT','8','RE_ROOM_HANDOFF','10','0','20',String(y),'30','0','40','2.5','1',`${d.label}: ${d.value} ${d.unit}`);y+=5;} lines.push('0','ENDSEC','0','EOF'); return lines.join('\n');
}
