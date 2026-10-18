import type {InsightTrend} from '../insights/types';
export const demoTrends:InsightTrend[]=[
 {metric:'circulation',direction:'improving',slope:.022,change:.11,confidence:.82,points:[{at:1,value:.42},{at:2,value:.47},{at:3,value:.51},{at:4,value:.53}]},
 {metric:'clutter',direction:'declining',slope:-.018,change:-.08,confidence:.78,points:[{at:1,value:.52},{at:2,value:.49},{at:3,value:.47},{at:4,value:.44}]},
 {metric:'visual-balance',direction:'stable',slope:.004,change:.01,confidence:.84,points:[{at:1,value:.65},{at:2,value:.66},{at:3,value:.65},{at:4,value:.66}]}
];
