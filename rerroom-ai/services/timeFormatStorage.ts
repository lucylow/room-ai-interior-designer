import AsyncStorage from "@react-native-async-storage/async-storage";

export const TIME_FORMAT_KEY = "rerroom.time-format.v1";
export type TimeFormat = "12h" | "24h";

export function parseTimeFormat(raw: string | null): TimeFormat {
  return raw === "24h" ? "24h" : "12h";
}

export async function loadTimeFormat(): Promise<TimeFormat> {
  try {
    return parseTimeFormat(await AsyncStorage.getItem(TIME_FORMAT_KEY));
  } catch {
    return "12h";
  }
}

export function timeFormatPreferenceCopy(format: TimeFormat): string { return format === "24h" ? "Retailer times will use 24-hour format." : "Retailer times will use 12-hour format."; }
export function timeFormatExplanationCopy(): string { return "Local time matches your device. UTC keeps retailer checks comparable across rooms and devices."; }

export async function saveTimeFormat(format: TimeFormat): Promise<TimeFormat> {
  await AsyncStorage.setItem(TIME_FORMAT_KEY, format);
  return format;
}
