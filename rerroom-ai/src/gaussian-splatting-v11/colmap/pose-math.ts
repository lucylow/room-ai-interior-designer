import type { ColmapImage } from './types';
import type { CameraPose, Quat, Vec3 } from '../core/types';
import { quatNormalize, quatConjugate, quatRotate } from '../math/quat';

export function colmapToCameraPose(image:ColmapImage):CameraPose{
  const q=quatNormalize(image.qvec as Quat);
  const t=image.tvec as Vec3;
  const position=quatRotate(quatConjugate(q),[-t[0],-t[1],-t[2]]);
  return {position,rotation:quatConjugate(q)};
}
export function averagePose(poses:CameraPose[]):CameraPose{if(!poses.length)return {position:[0,0,0],rotation:[1,0,0,0]};const p=poses.reduce((a,b)=>[a[0]+b.position[0],a[1]+b.position[1],a[2]+b.position[2]] as Vec3,[0,0,0] as Vec3);const inv=1/poses.length;return {position:[p[0]*inv,p[1]*inv,p[2]*inv],rotation:[1,0,0,0]};}
