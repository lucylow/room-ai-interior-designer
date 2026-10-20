import AsyncStorage from "@react-native-async-storage/async-storage";
import { runtimePolicy } from "./runtime";

export interface RenderedVersion {
  id: string;
  imageUri: string;
  createdAt: string;
}
export interface RefinementRecord {
  id: string;
  label: string;
  createdAt: string;
  versionId?: string;
}
export interface SavedDesign {
  id: string;
  title: string;
  style: string;
  roomType: string;
  imageUri: string;
  updatedAt: string;
  conceptCount: number;
  budget?: number;
  refinements?: RefinementRecord[];
  versions?: RenderedVersion[];
}

export type SavedDesignLoadSource = "saved" | "demo" | "empty" | "unavailable";
export type SavedDesignLoadIssue = "storage-unavailable" | "invalid-data";
export interface SavedDesignLoadResult {
  designs: SavedDesign[];
  source: SavedDesignLoadSource;
  issue?: SavedDesignLoadIssue;
}

export class SavedDesignStoreError extends Error {
  constructor(readonly code: SavedDesignLoadIssue) {
    super(
      code === "storage-unavailable" ? "Saved room storage is unavailable." : "Saved room data is invalid.",
    );
    this.name = "SavedDesignStoreError";
  }
}

export const SAVED_DESIGNS_KEY = "rerroom.saved-designs.v1";
export const demoSavedDesigns: SavedDesign[] = [
  {
    id: "living-room-refresh",
    title: "Living room refresh",
    style: "Modern warm",
    roomType: "Living room",
    imageUri: "demo://living-room",
    updatedAt: "Today",
    conceptCount: 2,
    budget: 1200,
    refinements: [
      {
        id: "initial",
        label: "Original concept generated",
        createdAt: "Today",
        versionId: "version-initial",
      },
    ],
    versions: [{ id: "version-initial", imageUri: "demo://living-room", createdAt: "Today" }],
  },
];

function normalizeDesign(item: unknown): SavedDesign | null {
  if (!item || typeof item !== "object") return null;
  const value = item as Partial<SavedDesign>;
  if (
    typeof value.id !== "string" ||
    !value.id.trim() ||
    typeof value.title !== "string" ||
    !value.title.trim()
  )
    return null;

  const refinements = Array.isArray(value.refinements)
    ? value.refinements
        .filter((entry): entry is RefinementRecord =>
          Boolean(
            entry &&
            typeof entry === "object" &&
            typeof (entry as RefinementRecord).id === "string" &&
            typeof (entry as RefinementRecord).label === "string" &&
            typeof (entry as RefinementRecord).createdAt === "string",
          ),
        )
        .map((entry) => ({
          ...entry,
          versionId: typeof entry.versionId === "string" ? entry.versionId : undefined,
        }))
    : undefined;
  const versions = Array.isArray(value.versions)
    ? value.versions.filter((entry): entry is RenderedVersion =>
        Boolean(
          entry &&
          typeof entry === "object" &&
          typeof (entry as RenderedVersion).id === "string" &&
          typeof (entry as RenderedVersion).imageUri === "string" &&
          typeof (entry as RenderedVersion).createdAt === "string",
        ),
      )
    : undefined;

  return {
    id: value.id.trim(),
    title: value.title.trim(),
    style: typeof value.style === "string" ? value.style : "Contemporary",
    roomType: typeof value.roomType === "string" ? value.roomType : "Room",
    imageUri: typeof value.imageUri === "string" ? value.imageUri : "demo://room",
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : "Recently",
    conceptCount:
      typeof value.conceptCount === "number" && Number.isFinite(value.conceptCount)
        ? Math.max(0, Math.floor(value.conceptCount))
        : 1,
    budget:
      typeof value.budget === "number" && Number.isFinite(value.budget) && value.budget > 0
        ? value.budget
        : undefined,
    refinements,
    versions,
  };
}

function parseSavedDesignsWithStatus(raw: string | null): { designs: SavedDesign[]; issue?: "invalid-data" } {
  if (raw === null) return { designs: [] };
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return { designs: [], issue: "invalid-data" };
    const designs = value.map(normalizeDesign).filter((item): item is SavedDesign => item !== null);
    return designs.length === value.length ? { designs } : { designs, issue: "invalid-data" };
  } catch {
    return { designs: [], issue: "invalid-data" };
  }
}

export function parseSavedDesigns(raw: string | null): SavedDesign[] {
  return parseSavedDesignsWithStatus(raw).designs;
}

export async function loadSavedDesignsWithStatus(): Promise<SavedDesignLoadResult> {
  let raw: string | null;
  try {
    raw = await AsyncStorage.getItem(SAVED_DESIGNS_KEY);
  } catch {
    return runtimePolicy.allowDemoData
      ? {
          designs: demoSavedDesigns.map((design) => ({ ...design })),
          source: "demo",
          issue: "storage-unavailable",
        }
      : { designs: [], source: "unavailable", issue: "storage-unavailable" };
  }

  const parsed = parseSavedDesignsWithStatus(raw);
  if (parsed.designs.length > 0) {
    return { ...parsed, source: "saved" };
  }
  if (parsed.issue) {
    return runtimePolicy.allowDemoData
      ? {
          designs: demoSavedDesigns.map((design) => ({ ...design })),
          source: "demo",
          issue: parsed.issue,
        }
      : { ...parsed, source: "unavailable" };
  }
  return runtimePolicy.allowDemoData
    ? { designs: demoSavedDesigns.map((design) => ({ ...design })), source: "demo" }
    : { designs: [], source: "empty" };
}

/** Backward-compatible list API for existing callers. */
export async function loadSavedDesigns(): Promise<SavedDesign[]> {
  return (await loadSavedDesignsWithStatus()).designs;
}

export async function saveSavedDesigns(designs: SavedDesign[]) {
  await AsyncStorage.setItem(SAVED_DESIGNS_KEY, JSON.stringify(designs.slice(0, 50)));
}

async function loadStoredDesignsForUpdate(): Promise<SavedDesign[]> {
  let raw: string | null;
  try {
    raw = await AsyncStorage.getItem(SAVED_DESIGNS_KEY);
  } catch {
    throw new SavedDesignStoreError("storage-unavailable");
  }

  if (raw === null) {
    return runtimePolicy.allowDemoData ? demoSavedDesigns.map((design) => ({ ...design })) : [];
  }

  const result = parseSavedDesignsWithStatus(raw);
  if (result.issue) throw new SavedDesignStoreError(result.issue);
  return result.designs;
}

export async function upsertSavedDesign(design: SavedDesign) {
  const current = await loadStoredDesignsForUpdate();
  const next = [design, ...current.filter((item) => item.id !== design.id)];
  await saveSavedDesigns(next);
  return next;
}

export async function appendRefinement(id: string, refinement: RefinementRecord, version?: RenderedVersion) {
  const current = await loadStoredDesignsForUpdate();
  if (!current.some((design) => design.id === id)) return null;
  const next = current.map((design) =>
    design.id === id
      ? {
          ...design,
          updatedAt: refinement.createdAt,
          refinements: [
            ...(design.refinements ?? []),
            { ...refinement, versionId: version?.id ?? refinement.versionId },
          ].slice(-20),
          versions: version ? [...(design.versions ?? []), version].slice(-20) : design.versions,
        }
      : design,
  );
  await saveSavedDesigns(next);
  return next.find((design) => design.id === id) ?? null;
}

export async function removeSavedDesign(id: string) {
  const current = await loadStoredDesignsForUpdate();
  if (!current.some((design) => design.id === id)) return current;
  const next = current.filter((design) => design.id !== id);
  await saveSavedDesigns(next);
  return next;
}

export async function updateSavedDesignBudget(id: string, budget: number) {
  if (!Number.isFinite(budget) || budget <= 0) {
    throw new RangeError("Saved room budgets must be finite positive amounts.");
  }
  const current = await loadStoredDesignsForUpdate();
  if (!current.some((design) => design.id === id)) return null;
  const next = current.map((design) => (design.id === id ? { ...design, budget } : design));
  await saveSavedDesigns(next);
  return next.find((design) => design.id === id) ?? null;
}
