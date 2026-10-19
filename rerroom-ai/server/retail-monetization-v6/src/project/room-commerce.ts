import type { CommerceCart } from '../types/commerce';export interface RoomCommerceLink{projectId:string;roomId:string;cartId:string;conceptId:string;approved:boolean}
export function linkRoomCart(projectId:string,roomId:string,cart:CommerceCart,conceptId:string):RoomCommerceLink{return {projectId,roomId,cartId:cart.id,conceptId,approved:false}}
