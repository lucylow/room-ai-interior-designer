export type RoomLoadErrorKind = "offline" | "unknown";
export function classifyRoomLoadError(error: unknown): RoomLoadErrorKind { const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase(); return /offline|network|fetch|timeout|connection/.test(message) ? "offline" : "unknown"; }
export function roomLoadCopy(kind: RoomLoadErrorKind) { return kind === "offline" ? { title: "You’re offline", body: "Reconnect and try again. Your saved designs stay on this device." } : { title: "Couldn’t load this room", body: "Your saved design is still on this device. Try again." }; }
export function shouldRetryRoomLoad(kind: RoomLoadErrorKind) { return kind === "offline" || kind === "unknown"; }
