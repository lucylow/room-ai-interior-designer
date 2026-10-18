import type {Feedback} from '../core/types';
export const demoFeedback:Feedback[]=[
 {recommendationId:'rule-layout-demo-living-01-0',action:'accepted',createdAt:Date.now()-86400000*5},
 {recommendationId:'rule-lighting-demo-living-01-1',action:'saved',createdAt:Date.now()-86400000*4},
 {recommendationId:'product-rug-1',action:'rejected',reason:'too expensive',createdAt:Date.now()-86400000*3},
 {recommendationId:'rule-storage-demo-living-01-0',action:'edited',reason:'prefer closed cabinet',createdAt:Date.now()-86400000*2},
 {recommendationId:'rule-comfort-demo-living-01-0',action:'ignored',createdAt:Date.now()-86400000}
];
