import type { OrderStatus } from '../types/commerce';
const allowed:Record<OrderStatus,OrderStatus[]>={draft:['pending_payment','cancelled'],pending_payment:['paid','failed','cancelled'],paid:['processing','refunded'],processing:['shipped','ready_for_pickup','cancelled'],shipped:['completed'],ready_for_pickup:['completed'],completed:['refunded'],cancelled:[],refunded:[],failed:['pending_payment','cancelled']};
export function canTransition(from:OrderStatus,to:OrderStatus){return allowed[from].includes(to)}
export function transition(from:OrderStatus,to:OrderStatus):OrderStatus{if(!canTransition(from,to))throw new Error(`invalid_order_transition:${from}->${to}`);return to}
export function allTransitions(){return Object.entries(allowed).flatMap(([from,tos])=>tos.map(to=>({from,to})))}
