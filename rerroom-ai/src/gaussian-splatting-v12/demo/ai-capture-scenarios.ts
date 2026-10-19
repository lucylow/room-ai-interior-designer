export type CaptureScenario={id:string;room:string;lighting:string;device:string;frameCount:number;expectedCoverage:number;expectedIssues:string[]};
export const scenarios:CaptureScenario[]=[
{id:'living-day',room:'living-room',lighting:'daylight',device:'iphone-pro',frameCount:180,expectedCoverage:.82,expectedIssues:[]},
{id:'kitchen-mixed',room:'kitchen',lighting:'mixed',device:'iphone-air',frameCount:150,expectedCoverage:.74,expectedIssues:['exposure-variation']},
{id:'bedroom-lowlight',room:'bedroom',lighting:'low-light',device:'android-high-end',frameCount:140,expectedCoverage:.68,expectedIssues:['noise','blur']},
{id:'office-fast',room:'home-office',lighting:'daylight',device:'iphone-pro',frameCount:110,expectedCoverage:.61,expectedIssues:['coverage-low']},
{id:'hallway-loop',room:'hallway',lighting:'artificial',device:'iphone-pro',frameCount:95,expectedCoverage:.78,expectedIssues:[]},
];
