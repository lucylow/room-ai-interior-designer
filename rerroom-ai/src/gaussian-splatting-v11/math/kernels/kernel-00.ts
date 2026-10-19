export function gaussianWeight00(distance:number,sigma:number):number{const s=Math.max(1e-6,sigma);return Math.exp(-0.5*(distance/s)**2);}
export function anisotropicPenalty00(a:number,b:number,c:number):number{const values=[Math.abs(a),Math.abs(b),Math.abs(c)].sort((x,y)=>x-y);return values[2]/Math.max(values[0],1e-5);}
export function axisSelector00(v:[number,number,number]):number{return v[0];}
export const PRIMARY_AXIS_00='x';
