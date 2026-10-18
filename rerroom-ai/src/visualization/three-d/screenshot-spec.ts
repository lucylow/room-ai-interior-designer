export interface ScreenshotSpec {
  width:number;
  height:number;
  pixelRatio:number;
  transparent:boolean;
  includeUi:boolean;
  quality:number;
}

export const HERO_SCREENSHOT: ScreenshotSpec={
  width:1920,height:1080,pixelRatio:2,transparent:false,includeUi:false,quality:1,
};

export function normalizeScreenshot(input:Partial<ScreenshotSpec>):ScreenshotSpec{
  return {
    width:Math.min(6000,Math.max(640,input.width??1920)),
    height:Math.min(6000,Math.max(360,input.height??1080)),
    pixelRatio:Math.min(3,Math.max(1,input.pixelRatio??2)),
    transparent:Boolean(input.transparent),
    includeUi:Boolean(input.includeUi),
    quality:Math.min(1,Math.max(0.3,input.quality??1)),
  };
}

export function pixelCount(spec:ScreenshotSpec):number{
  return Math.ceil(spec.width*spec.pixelRatio)*Math.ceil(spec.height*spec.pixelRatio);
}
