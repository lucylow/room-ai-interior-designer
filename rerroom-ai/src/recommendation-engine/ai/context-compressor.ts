export interface CompressResult<T>{value:T;removed:string[];estimatedTokens:number;}
export const compressArray=<T>(items:T[],limit:number):CompressResult<T[]>=>{const value=items.slice(0,limit);return {value,removed:items.slice(limit).map((_,i)=>`item-${limit+i}`),estimatedTokens:Math.ceil(JSON.stringify(value).length/4)};};
export const compressText=(text:string,maxChars:number):CompressResult<string>=>{const value=text.slice(0,maxChars);return {value,removed:text.length>maxChars?['tail']:[],estimatedTokens:Math.ceil(value.length/4)};};
