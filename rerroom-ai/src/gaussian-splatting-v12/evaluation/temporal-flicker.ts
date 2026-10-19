export function flickerScore(frames:number[][]){if(frames.length<2)return 0;let total=0,count=0;for(let f=1;f<frames.length;f++){const a=frames[f-1],b=frames[f],n=Math.min(a.length,b.length);for(let i=0;i<n;i++){total+=Math.abs(a[i]-b[i]);count++}}return total/(count||1)}
export function stable(flicker:number,threshold=.03){return flicker<=threshold}
