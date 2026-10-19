import { GENERATIVE_DATA_V10 } from "../index";

export function toJsonLines(): string {
  const rows: unknown[] = [];
  for (const [family, records] of Object.entries(GENERATIVE_DATA_V10)) {
    if (family === "version" || !Array.isArray(records)) continue;
    for (const record of records) rows.push({ family, record });
  }
  return rows.map((row) => JSON.stringify(row)).join("\n");
}

export function familyCounts(): Record<string, number> {
  return Object.fromEntries(Object.entries(GENERATIVE_DATA_V10).filter(([key]) => key !== "version" && Array.isArray(GENERATIVE_DATA_V10[key as keyof typeof GENERATIVE_DATA_V10])).map(([key,value]) => [key, (value as unknown[]).length]));
}
