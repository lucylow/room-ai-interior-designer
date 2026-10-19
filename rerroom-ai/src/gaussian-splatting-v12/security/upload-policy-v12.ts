export type UploadPolicy={maxFrames:number;maxBytes:number;allowOriginals:boolean;allowTrainingReuse:boolean;retentionDays:number};
export function defaultPolicy():UploadPolicy{return{maxFrames:1200,maxBytes:2_000_000_000,allowOriginals:false,allowTrainingReuse:false,retentionDays:14}}
export function validateFrameUpload(policy:UploadPolicy,count:number,bytes:number){const reasons:string[]=[];if(count>policy.maxFrames)reasons.push('frame-count');if(bytes>policy.maxBytes)reasons.push('byte-limit');return{allowed:reasons.length===0,reasons}}
