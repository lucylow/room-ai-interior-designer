import type { CommerceOrder } from '../types/commerce';import { orderRevenue } from '../monetization/revenue-model';
export function commissionReport(orders:CommerceOrder[]){return orders.map(order=>{const r=orderRevenue(order);return {orderId:order.id,provider:order.provider,gross:r.gross.amount,commission:r.commission.amount,platformFee:r.platformFee.amount,net:r.net.amount}})}
