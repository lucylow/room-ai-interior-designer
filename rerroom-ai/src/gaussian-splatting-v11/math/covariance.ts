import type { Gaussian3D, Mat3 } from '../core/types';
import { quatToMatrix } from './quat';
import { mat3Diag, mat3Mul, mat3Transpose } from './mat3';

export function covarianceFromGaussian(g: Gaussian3D): Mat3 {
  const R=quatToMatrix(g.rotation);
  const S=mat3Diag([g.scale[0]**2,g.scale[1]**2,g.scale[2]**2]);
  return mat3Mul(mat3Mul(R,S),mat3Transpose(R));
}

export function regularizeCovariance(c:Mat3,epsilon=1e-5):Mat3 {
  return [c[0]+epsilon,c[1],c[2],c[3],c[4]+epsilon,c[5],c[6],c[7],c[8]+epsilon];
}

export function principalScale(g:Gaussian3D):number { return Math.max(g.scale[0],g.scale[1],g.scale[2]); }
export function covarianceConditionHint(g:Gaussian3D):number { const max=principalScale(g),min=Math.max(1e-6,Math.min(...g.scale)); return max/min; }
