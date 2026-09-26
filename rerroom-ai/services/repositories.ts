import { appServices, type CatalogItem, type Design, type GenerationJob, type Room } from "./api";
export interface RoomRepository { list(): Promise<Room[]>; get(id: string): Promise<Room>; create(input: Omit<Room, "id" | "createdAt" | "updatedAt">): Promise<Room>; }
export interface DesignRepository { list(roomId?: string): Promise<Design[]>; get(id: string): Promise<Design>; }
export interface GenerationRepository { start(input: { roomId: string; style: string; request: string; budget?: number }): Promise<GenerationJob>; get(id: string): Promise<GenerationJob>; }
export interface CatalogRepository { search(query: string, category?: string): Promise<CatalogItem[]>; }
export const repositories: { rooms: RoomRepository; designs: DesignRepository; generations: GenerationRepository; catalog: CatalogRepository } = { rooms: appServices.rooms, designs: appServices.designs, generations: appServices.generations, catalog: appServices.catalog };
