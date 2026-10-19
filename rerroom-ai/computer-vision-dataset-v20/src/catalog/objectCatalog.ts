export interface ObjectSpec {
  className: string;
  min: { w: number; h: number; d: number };
  max: { w: number; h: number; d: number };
  support: "floor" | "wall" | "surface" | "any";
}
export const OBJECT_SPECS: Record<string, ObjectSpec> = {
  sofa: {
    className: "sofa",
    min: { w: 1.4, h: 0.65, d: 0.6 },
    max: { w: 3.2, h: 1.1, d: 1.2 },
    support: "floor",
  },
  table: {
    className: "table",
    min: { w: 0.6, h: 0.5, d: 0.5 },
    max: { w: 2.5, h: 1.0, d: 2.0 },
    support: "floor",
  },
  chair: {
    className: "chair",
    min: { w: 0.35, h: 0.7, d: 0.35 },
    max: { w: 0.9, h: 1.3, d: 0.9 },
    support: "floor",
  },
  bed: {
    className: "bed",
    min: { w: 1.0, h: 0.4, d: 1.8 },
    max: { w: 2.2, h: 0.9, d: 2.3 },
    support: "floor",
  },
  nightstand: {
    className: "nightstand",
    min: { w: 0.35, h: 0.4, d: 0.3 },
    max: { w: 0.8, h: 0.9, d: 0.7 },
    support: "floor",
  },
  dresser: {
    className: "dresser",
    min: { w: 0.7, h: 0.7, d: 0.3 },
    max: { w: 2, h: 1.5, d: 0.8 },
    support: "floor",
  },
  desk: {
    className: "desk",
    min: { w: 0.8, h: 0.6, d: 0.45 },
    max: { w: 2.2, h: 0.9, d: 1.0 },
    support: "floor",
  },
  cabinet: {
    className: "cabinet",
    min: { w: 0.4, h: 0.7, d: 0.25 },
    max: { w: 2.5, h: 2.6, d: 0.9 },
    support: "floor",
  },
  countertop: {
    className: "countertop",
    min: { w: 1, h: 0.7, d: 0.4 },
    max: { w: 5, h: 1.3, d: 1.0 },
    support: "wall",
  },
  island: {
    className: "island",
    min: { w: 0.8, h: 0.7, d: 0.7 },
    max: { w: 3, h: 1.2, d: 1.5 },
    support: "floor",
  },
  lamp: {
    className: "lamp",
    min: { w: 0.15, h: 0.2, d: 0.15 },
    max: { w: 0.6, h: 2.2, d: 0.6 },
    support: "surface",
  },
  rug: { className: "rug", min: { w: 0.5, h: 0.01, d: 0.5 }, max: { w: 4, h: 0.08, d: 5 }, support: "floor" },
  plant: {
    className: "plant",
    min: { w: 0.1, h: 0.2, d: 0.1 },
    max: { w: 1.0, h: 2.5, d: 1.0 },
    support: "surface",
  },
  tv: {
    className: "tv",
    min: { w: 0.5, h: 0.3, d: 0.03 },
    max: { w: 2.5, h: 1.5, d: 0.15 },
    support: "wall",
  },
  sink: {
    className: "sink",
    min: { w: 0.4, h: 0.7, d: 0.3 },
    max: { w: 1.5, h: 1.1, d: 0.8 },
    support: "floor",
  },
  bathtub: {
    className: "bathtub",
    min: { w: 0.65, h: 0.45, d: 1.4 },
    max: { w: 1.1, h: 0.75, d: 2.0 },
    support: "floor",
  },
  toilet: {
    className: "toilet",
    min: { w: 0.35, h: 0.65, d: 0.55 },
    max: { w: 0.5, h: 0.9, d: 0.8 },
    support: "floor",
  },
  refrigerator: {
    className: "refrigerator",
    min: { w: 0.55, h: 1.4, d: 0.55 },
    max: { w: 1.2, h: 2.2, d: 1.0 },
    support: "floor",
  },
  oven: {
    className: "oven",
    min: { w: 0.55, h: 0.5, d: 0.5 },
    max: { w: 1.2, h: 1.2, d: 0.9 },
    support: "floor",
  },
  stool: {
    className: "stool",
    min: { w: 0.3, h: 0.45, d: 0.3 },
    max: { w: 0.6, h: 0.9, d: 0.6 },
    support: "floor",
  },
  shelf: {
    className: "shelf",
    min: { w: 0.4, h: 0.5, d: 0.15 },
    max: { w: 2.5, h: 2.6, d: 0.6 },
    support: "wall",
  },
  console: {
    className: "console",
    min: { w: 0.5, h: 0.5, d: 0.2 },
    max: { w: 2, h: 1.2, d: 0.6 },
    support: "floor",
  },
  mirror: {
    className: "mirror",
    min: { w: 0.25, h: 0.4, d: 0.02 },
    max: { w: 2, h: 2.5, d: 0.08 },
    support: "wall",
  },
  window: {
    className: "window",
    min: { w: 0.3, h: 0.5, d: 0.03 },
    max: { w: 3, h: 2.8, d: 0.1 },
    support: "wall",
  },
  door: {
    className: "door",
    min: { w: 0.65, h: 1.9, d: 0.02 },
    max: { w: 1.5, h: 2.5, d: 0.12 },
    support: "wall",
  },
};
