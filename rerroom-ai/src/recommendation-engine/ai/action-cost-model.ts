import type {Action} from '../core/types';
const weights:Record<Action['type'],number>={'move-object':1,'resize-object':2,'rotate-object':1.2,'add-object':3,'remove-object':1,'replace-object':3.4,'change-surface':2.4,'change-lighting':2.1,'shop-item':3,'create-task':.4,'none':0};
export const actionCost=(a:Action)=>weights[a.type];
export const planCost=(actions:Action[])=>actions.reduce((sum,a)=>sum+actionCost(a),0);
