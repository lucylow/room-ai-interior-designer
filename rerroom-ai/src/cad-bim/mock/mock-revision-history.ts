export const mockRevisionHistory=[
 {id:'rev-001',projectId:'project-demo',parentId:undefined,label:'Source imported',author:'system',day:1,kind:'source'},
 {id:'rev-002',projectId:'project-demo',parentId:'rev-001',label:'Warm palette concept',author:'ai',day:2,kind:'concept'},
 {id:'rev-003',projectId:'project-demo',parentId:'rev-002',label:'Sofa preserved + chair added',author:'designer',day:3,kind:'layout'},
 {id:'rev-004',projectId:'project-demo',parentId:'rev-003',label:'Client asks for more open circulation',author:'client',day:4,kind:'comment'},
 {id:'rev-005',projectId:'project-demo',parentId:'rev-004',label:'Open circulation revision',author:'ai',day:4,kind:'layout'},
 {id:'rev-006',projectId:'project-demo',parentId:'rev-005',label:'Lighting refinement',author:'designer',day:5,kind:'finish'},
 {id:'rev-007',projectId:'project-demo',parentId:'rev-006',label:'Client approval candidate',author:'client',day:6,kind:'review'},
];
export const mockRevisionComments=[
 {id:'comment-01',revisionId:'rev-004',author:'Client',text:'Keep the window side open and bright.',linkedIds:['window-1','zone-living-1']},
 {id:'comment-02',revisionId:'rev-005',author:'Designer',text:'Shifted the seating cluster while keeping the source wall positions unchanged.',linkedIds:['wall-north','wall-south']},
 {id:'comment-03',revisionId:'rev-007',author:'Client',text:'This layout is ready for a presentation review.',linkedIds:['plan-demo']},
];
