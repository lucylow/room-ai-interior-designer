import type {Scenario} from '../core/types';
export const demoScenarios:Scenario[]=[
 {id:'open-lounge',name:'Open lounge',description:'Move coffee table closer to seating center and preserve the main route.',deltas:[{objectId:'coffee',moveX:-.2}],expectedOutcome:'Improved circulation around the seating group.'},
 {id:'storage-wall',name:'Storage wall',description:'Replace a small console with a larger low storage unit.',deltas:[{objectId:'tv',moveZ:-.15}],expectedOutcome:'More storage with a continuous low visual line.'},
 {id:'reading-zone',name:'Reading zone',description:'Rotate the reading chair toward the window.',deltas:[{objectId:'chair',rotate:.35}],expectedOutcome:'Better alignment with daylight and a defined reading zone.'}
];
