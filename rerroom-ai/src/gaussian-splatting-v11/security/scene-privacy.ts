export interface ScenePrivacyPolicy {allowCloudUpload:boolean;allowTrainingReuse:boolean;retainDays:number;stripExif:boolean;blurPeople:boolean;encryptAtRest:boolean;}
export const DEFAULT_SCENE_PRIVACY:ScenePrivacyPolicy={allowCloudUpload:false,allowTrainingReuse:false,retainDays:30,stripExif:true,blurPeople:true,encryptAtRest:true};
export function canExternalize(policy:ScenePrivacyPolicy,purpose:'render'|'training'|'handoff'):boolean{if(!policy.allowCloudUpload)return false;if(purpose==='training'&&!policy.allowTrainingReuse)return false;return true;}
