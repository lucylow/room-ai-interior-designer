export type ID = string;
export type CurrencyCode = "USD" | "CAD";
export type RoomType = "Living Room" | "Bedroom" | "Kitchen" | "Dining" | "Office" | "Bathroom" | "Entryway";
export type DesignStyle =
  | "Warm Minimalism"
  | "Scandinavian"
  | "Japandi"
  | "Organic Modern"
  | "Contemporary"
  | "Mid-Century"
  | "Coastal"
  | "Industrial"
  | "Wabi-Sabi"
  | "Art Deco";
export type ProductCategory =
  "Sofas" | "Seating" | "Tables" | "Lighting" | "Rugs" | "Storage" | "Decor" | "Beds" | "Dining" | "Outdoor";
export type ProjectStatus =
  "Draft" | "Scanning" | "Design Ready" | "Shopping" | "In Construction" | "Complete";
export type ARMode = "Scan" | "Measure" | "Place" | "Capture";
export type PlaneKind = "Floor" | "Wall" | "Table" | "Counter";
export type NotificationKind = "design" | "shopping" | "project" | "system";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ImageRef {
  uri: string;
  alt: string;
  blurHash?: string;
}

export interface Room {
  id: ID;
  name: string;
  type: RoomType;
  style: DesignStyle;
  image: ImageRef;
  areaSqFt: number;
  dimensions: { widthM: number; lengthM: number; ceilingM: number };
  completion: number;
  lastEdited: string;
  favoriteCount: number;
  status: ProjectStatus;
  palette: string[];
  tags: string[];
}

export interface FurnitureProduct {
  id: ID;
  name: string;
  brand: string;
  category: ProductCategory;
  image: ImageRef;
  price: Money;
  compareAt?: Money | null;
  rating: number;
  reviewCount: number;
  dimensionsCm: { width: number; depth: number; height: number };
  material: string;
  finish?: string;
  colors: string[];
  inStock: boolean;
  deliveryDays: number;
  arReady: boolean;
  roomStyles: DesignStyle[];
  tags: string[];
}

export interface AIRecommendation {
  id: ID;
  title: string;
  summary: string;
  image: ImageRef;
  type: "layout" | "style" | "product" | "palette" | "lighting";
  confidence: number;
  actionLabel: string;
}

export interface Measurement {
  id: ID;
  label: string;
  value: number;
  unit: "m" | "cm" | "ft" | "in";
  from: string;
  to: string;
  confidence: number;
  kind: "wall" | "ceiling" | "clearance" | "object" | "area";
}

export interface ARPlane {
  id: ID;
  kind: PlaneKind;
  widthM: number;
  heightM: number;
  center: { x: number; y: number; z: number };
  angle: number;
  confidence: number;
}

export interface ARSceneObject {
  id: ID;
  productId: ID;
  position: { x: number; y: number; z: number };
  rotationY: number;
  scale: number;
  anchored: boolean;
  selected: boolean;
  collision: boolean;
  snapped: boolean;
}

export interface ARSceneState {
  roomId: ID;
  mode: ARMode;
  tracking: "initializing" | "limited" | "normal" | "paused";
  lighting: number;
  planeCount: number;
  depthAvailable: boolean;
  occlusionEnabled: boolean;
  roomBoundaryDetected: boolean;
  objects: ARSceneObject[];
  measurements: Measurement[];
  lastFrameMs: number;
  framesPerSecond: number;
}

export interface ProjectBudgetLine {
  id: ID;
  label: string;
  category: "Furniture" | "Materials" | "Labor" | "Lighting" | "Decor" | "Shipping";
  planned: Money;
  actual: Money;
}

export interface ProjectTask {
  id: ID;
  title: string;
  description: string;
  dueDate: string;
  status: "Todo" | "In Progress" | "Blocked" | "Done";
  progress: number;
  owner: string;
  durationDays: number;
}

export interface DesignProject {
  id: ID;
  name: string;
  roomId: ID;
  image: ImageRef;
  status: ProjectStatus;
  completion: number;
  budget: Money;
  spent: Money;
  estimatedDays: number;
  startDate: string;
  targetDate: string;
  budgetLines: ProjectBudgetLine[];
  tasks: ProjectTask[];
  materialSummary: { label: string; value: string; quantity: string }[];
}

export interface NotificationItem {
  id: ID;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface StylePreset {
  id: ID;
  name: DesignStyle;
  description: string;
  image: ImageRef;
  primaryColor: string;
  secondaryColor: string;
  traits: string[];
}
