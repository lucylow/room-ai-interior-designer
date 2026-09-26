export const runtimePolicy = {
  isProduction: process.env.NODE_ENV === "production",
  allowDemoData: process.env.NODE_ENV !== "production" && process.env.EXPO_PUBLIC_USE_DEMO_DATA === "true",
  apiConfigured: Boolean(process.env.EXPO_PUBLIC_API_URL),
} as const;
export function assertProductionReady() { if (runtimePolicy.isProduction && !runtimePolicy.apiConfigured) throw new Error("API_NOT_CONFIGURED"); }
