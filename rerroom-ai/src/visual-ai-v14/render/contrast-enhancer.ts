import { RGBAFrame, clamp } from '../core/types';
export function enhanceContrast(frame:RGBAFrame,amount=.12):RGBAFrame{ const out={width:frame.width,height:frame.height,data:new Uint8ClampedArray(frame.data)}; for(let i=0;i<out.data.length;i+=4){ for(let c=0;c<3;c++){ const x=out.data[i+c]/255; const y=clamp(.5+(x-.5)*(1+amount)); out.data[i+c]=Math.round(y*255); } } return out; }
