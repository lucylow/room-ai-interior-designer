export function gaussianWeight07(distance:number,sigma:number):number{const s=Math.max(1e-6,sigma);return Math.exp(-0.5*(distance/s)**2);}
export function anisotropicPenalty07(a:number,b:number,c:number):number{const values=[Math.abs(a),Math.abs(b),Math.abs(c)].sort((x,y)=>x-y);return values[2]/Math.max(values[0],1e-5);}
export function axisSelector07(v:[number,number,number]):number{return v[1];}
export const PRIMARY_AXIS_07='y';
