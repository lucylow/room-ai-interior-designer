import type {Feedback,Recommendation,Insight} from '../core/types';
export interface AISessionState{sessionId:string;turns:number;feedback:Feedback[];recommendations:Recommendation[];insights:Insight[];lastGeneratedAt:number;}
export const createAISession=(sessionId:string):AISessionState=>({sessionId,turns:0,feedback:[],recommendations:[],insights:[],lastGeneratedAt:0});
export const appendFeedback=(state:AISessionState,feedback:Feedback):AISessionState=>({...state,feedback:[...state.feedback,feedback].slice(-100)});
export const replaceResults=(state:AISessionState,recommendations:Recommendation[],insights:Insight[]):AISessionState=>({...state,recommendations,insights,lastGeneratedAt:Date.now()});
export const nextTurn=(state:AISessionState):AISessionState=>({...state,turns:state.turns+1});
