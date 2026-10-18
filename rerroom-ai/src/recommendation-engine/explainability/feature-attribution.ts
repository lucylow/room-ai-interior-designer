import type {Recommendation,RoomContext} from '../core/types';import {clamp} from '../core/math';
export interface Attribution {feature:string;contribution:number;reason:string;}
export const attribute=(r:Recommendation,room:RoomContext):Attribution[]=>[
 {feature:'room measurement confidence',contribution:clamp(room.measurements.confidence*.25),reason:'Higher confidence increases trust in spatial signals.'},
 {feature:'category relevance',contribution:clamp(0),reason:'User priorities affect personalized ranking.'},
 {feature:'expected impact',contribution:clamp(r.expectedImpact*.4),reason:'Expected impact is a major ranking objective.'},
 {feature:'recommendation confidence',contribution:clamp(r.confidence*.35),reason:'Evidence quality affects ranking.'}
];
