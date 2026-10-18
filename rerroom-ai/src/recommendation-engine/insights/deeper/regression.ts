import type {Insight} from '../../core/types';
export const linearRegression=(values:number[])=>{const n=values.length;if(n<2)return {slope:0,intercept:values[0]??0};const xMean=(n-1)/2,yMean=values.reduce((a,b)=>a+b,0)/n;let num=0,den=0;for(let i=0;i<n;i++){num+=(i-xMean)*(values[i]-yMean);den+=(i-xMean)**2;}const slope=den?num/den:0;return {slope,intercept:yMean-slope*xMean};};
export const forecastNext=(values:number[],steps=1)=>{const m=linearRegression(values);const x=Math.max(0,values.length-1);return Array.from({length:steps},(_,i)=>m.intercept+m.slope*(x+i+1));};
