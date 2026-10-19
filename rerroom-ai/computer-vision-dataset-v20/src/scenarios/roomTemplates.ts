import { ObjectClass, RoomType } from "../core/types";

export const ROOM_TEMPLATES: Record<RoomType, ObjectClass[]> = {
  living_room: ["sofa", "table", "tv", "rug", "lamp", "plant", "window", "door", "cabinet"],
  bedroom: ["bed", "nightstand", "dresser", "lamp", "rug", "window", "door"],
  kitchen: ["countertop", "island", "refrigerator", "oven", "sink", "stool", "window", "door"],
  dining_room: ["table", "chair", "chair", "chair", "chair", "lamp", "window", "door", "cabinet"],
  bathroom: ["toilet", "sink", "bathtub", "cabinet", "mirror", "door"],
  office: ["desk", "chair", "shelf", "lamp", "plant", "window", "door"],
  hallway: ["console", "lamp", "rug", "window", "door", "door"],
  entryway: ["console", "rug", "plant", "door", "door"],
  studio: ["sofa", "bed", "desk", "chair", "table", "rug", "window", "door"],
  basement: ["sofa", "table", "tv", "shelf", "lamp", "door", "window"],
};
