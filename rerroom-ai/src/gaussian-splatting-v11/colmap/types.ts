export interface ColmapCamera { id:number; model:string; width:number; height:number; params:number[]; }
export interface ColmapImage { id:number; qvec:[number,number,number,number]; tvec:[number,number,number]; cameraId:number; name:string; }
export interface ColmapPoint3D { id:number; xyz:[number,number,number]; rgb:[number,number,number]; error:number; imageIds:number[]; }
export interface ColmapDataset { cameras:ColmapCamera[]; images:ColmapImage[]; points:ColmapPoint3D[]; }
