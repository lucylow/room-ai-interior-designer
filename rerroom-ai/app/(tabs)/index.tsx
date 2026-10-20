import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import type { SavedDesign, SavedDesignLoadIssue } from "@/services/savedDesigns";
import { loadSavedDesignsWithStatus } from "@/services/savedDesigns";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { mobileDesign } from "@/constants/mobile-design";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1705326701287-346fc37a2c86?auto=format&fit=crop&w=1200&q=85";
const QUICK_STARTS = [
  { label: "Living room", icon: "home-outline" },
  { label: "Bedroom", icon: "bed-outline" },
  { label: "Kitchen", icon: "restaurant-outline" },
  { label: "Home office", icon: "desktop-outline" },
] as const;
type RoomLoadState = "loading" | "ready" | "error";

export default function HomeScreen() {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const roomCardWidth = Math.min(width - 88, 340);
  const [rooms, setRooms] = useState<SavedDesign[]>([]);
  const [loadState, setLoadState] = useState<RoomLoadState>("loading");
  const [isDemoData, setIsDemoData] = useState(false);
  const [loadIssue, setLoadIssue] = useState<SavedDesignLoadIssue | "load-failed" | null>(null);
  const [heroFailed, setHeroFailed] = useState(false);
  const requestId = useRef(0);

  const refreshRooms = useCallback(async () => {
    const activeRequest = ++requestId.current;
    setLoadState("loading");
    setLoadIssue(null);
    try {
      const result = await loadSavedDesignsWithStatus();
      if (activeRequest !== requestId.current) return;
      setRooms(result.designs);
      setIsDemoData(result.source === "demo");
      setLoadIssue(result.issue ?? null);
      setLoadState(result.source === "unavailable" ? "error" : "ready");
    } catch {
      if (activeRequest !== requestId.current) return;
      setRooms([]);
      setIsDemoData(false);
      setLoadIssue("load-failed");
      setLoadState("error");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refreshRooms();
      return () => {
        requestId.current += 1;
      };
    }, [refreshRooms]),
  );

  const totalConcepts = rooms.reduce((sum, room) => sum + Math.max(0, room.conceptCount), 0);

  function startRoom(roomType: string) {
    router.push({ pathname: "/(tabs)/create", params: { prompt: `Redesign my ${roomType.toLowerCase()}` } });
  }

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>RE:ROOM AI</Text>
            <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
              Make room for{`\n`}better.
            </Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              A thoughtful next step for the space you have.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile and settings"
            hitSlop={8}
            onPress={() => router.push("/(tabs)/profile")}
            style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
          >
            <Ionicons name="person-outline" size={20} color={mobileDesign.color.ink} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          {!heroFailed ? (
            <ImageBackground
              source={{ uri: HERO_IMAGE }}
              resizeMode="cover"
              onError={() => setHeroFailed(true)}
              style={StyleSheet.absoluteFill}
              accessibilityIgnoresInvertColors
            />
          ) : (
            <View style={styles.heroFallback}>
              <View style={styles.heroFallbackWindow} />
              <View style={styles.heroFallbackSofa} />
              <View style={styles.heroFallbackPlant} />
            </View>
          )}
          <View style={styles.heroShade} />
          <View style={styles.heroContent}>
            <View style={styles.heroPill}>
              <Ionicons name="sparkles" size={14} color={mobileDesign.color.white} />
              <Text style={styles.heroPillText}>DESIGN AROUND YOUR REAL ROOM</Text>
            </View>
            <Text style={styles.heroTitle}>See what your room could become.</Text>
            <Text style={styles.heroBody}>Start with a photo. Keep the pieces and details that matter.</Text>
            <View style={styles.heroActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Start designing with a room photo"
                onPress={() => router.push("/(tabs)/create")}
                style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
              >
                <Text style={styles.heroButtonText}>Start a room</Text>
                <Ionicons name="arrow-forward" size={17} color={mobileDesign.color.ink} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open Studio and saved spaces"
                onPress={() => router.push("/(tabs)/rooms")}
                style={({ pressed }) => [styles.heroSecondaryButton, pressed && styles.pressed]}
              >
                <Text style={styles.heroSecondaryButtonText}>Open Studio</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View
          accessibilityLabel={`${rooms.length} ${isDemoData ? "example" : "saved"} ${rooms.length === 1 ? "room" : "rooms"}; ${totalConcepts} ${isDemoData ? "example" : "saved"} design concepts`}
          style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>{rooms.length}</Text>
            <Text style={[styles.summaryLabel, { color: colors.muted }]}>
              {isDemoData ? "example spaces" : "saved spaces"}
            </Text>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>{totalConcepts}</Text>
            <Text style={[styles.summaryLabel, { color: colors.muted }]}>
              {isDemoData ? "example concepts" : "saved concepts"}
            </Text>
          </View>
          <View style={styles.summaryIcon}>
            <Ionicons name="home-outline" size={18} color={colors.primary} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.foreground }]}>
              Your spaces
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
              {isDemoData ? "Example room from demo mode." : "Pick up where you left off."}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open Studio and saved spaces"
            hitSlop={8}
            onPress={() => router.push("/(tabs)/rooms")}
            style={styles.seeAllButton}
          >
            <Text style={[styles.seeAll, { color: colors.primary }]}>Studio</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.primary} />
          </Pressable>
        </View>

        {loadIssue && loadState === "ready" ? (
          <View
            accessibilityRole="alert"
            style={[styles.warningCard, { backgroundColor: colors.surface, borderColor: colors.warning }]}
          >
            <Ionicons name="warning-outline" size={19} color={colors.warning} />
            <Text style={[styles.warningText, { color: colors.foreground }]}>
              {loadIssue === "storage-unavailable"
                ? "Saved rooms are temporarily unavailable. Showing example rooms instead."
                : loadIssue === "invalid-data"
                  ? "Some saved room data is unreadable. Changes are paused to protect existing data."
                  : "Saved rooms could not be loaded. Try again to see your latest spaces."}
            </Text>
          </View>
        ) : null}

        {loadState === "loading" ? (
          <View
            accessibilityRole="progressbar"
            accessibilityLabel="Loading saved spaces"
            style={[styles.stateCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <ActivityIndicator color={colors.primary} />
            <Text style={[styles.stateText, { color: colors.muted }]}>Loading your spaces…</Text>
          </View>
        ) : loadState === "error" ? (
          <View
            accessibilityRole="alert"
            style={[styles.stateCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Ionicons name="cloud-offline-outline" size={24} color={colors.error} />
            <Text style={[styles.stateTitle, { color: colors.foreground }]}>Your spaces didn’t load</Text>
            <Text style={[styles.stateText, { color: colors.muted }]}>
              {loadIssue === "invalid-data"
                ? "Some saved room data is unreadable. Changes are paused to protect existing data."
                : loadIssue === "storage-unavailable"
                  ? "Saved rooms are temporarily unavailable. Try again in a moment."
                  : "Your saved rooms could not be loaded. Try again, or start a new room."}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => void refreshRooms()}
              style={[styles.retryButton, { borderColor: colors.primary }]}
            >
              <Text style={[styles.retryText, { color: colors.primary }]}>Try again</Text>
            </Pressable>
          </View>
        ) : rooms.length === 0 ? (
          <View
            style={[
              styles.stateCard,
              styles.emptyCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={[styles.emptyIcon, { backgroundColor: mobileDesign.color.cream }]}>
              <Ionicons name="image-outline" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.stateTitle, { color: colors.foreground }]}>
              Your first space starts here
            </Text>
            <Text style={[styles.stateText, { color: colors.muted }]}>
              Capture a room or choose a photo. Saved designs will stay connected to your Studio.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(tabs)/create")}
              style={[styles.emptyAction, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.emptyActionText}>Create a room</Text>
              <Ionicons name="arrow-forward" size={16} color={mobileDesign.color.white} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.roomList}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.roomCarousel}
              accessibilityLabel="Your saved spaces, swipe to browse"
            >
              {rooms.slice(0, 6).map((room) => (
                <SavedRoomCard
                  key={room.id}
                  room={room}
                  width={roomCardWidth}
                  onPress={() => router.push({ pathname: "/room/[id]", params: { id: room.id } })}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <View>
            <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.foreground }]}>
              Begin with a feeling
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
              Choose a room to start a guided redesign.
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickStarts}
        >
          {QUICK_STARTS.map(({ label, icon }) => (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityLabel={`Start a ${label.toLowerCase()} redesign`}
              accessibilityHint="Opens the room photo and design flow"
              onPress={() => startRoom(label)}
              style={({ pressed }) => [
                styles.quickStart,
                { backgroundColor: colors.surface, borderColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.quickStartIcon, { backgroundColor: mobileDesign.color.cream }]}>
                <Ionicons name={icon} size={15} color={colors.primary} />
              </View>
              <Text style={[styles.quickStartText, { color: colors.foreground }]}>{label}</Text>
              <Ionicons name="arrow-forward" size={13} color={colors.muted} />
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.bottomSpace} />
      </ScrollView>
    </ScreenContainer>
  );
}

function SavedRoomCard({ room, width, onPress }: { room: SavedDesign; width: number; onPress: () => void }) {
  const colors = useColors();
  const isDemoRoom = room.imageUri.startsWith("demo://");
  const isDemoImage = !room.imageUri || isDemoRoom;
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isDemoRoom
          ? `Open example room ${room.title}`
          : `Continue ${room.title}, ${room.conceptCount} ${room.conceptCount === 1 ? "concept" : "concepts"}`
      }
      accessibilityHint="Opens this saved room and its refinement history"
      onPress={onPress}
      style={({ pressed }) => [
        styles.roomCard,
        { width },
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.roomImage}>
        {!isDemoImage && !imageFailed ? (
          <Image
            source={{ uri: room.imageUri }}
            onError={() => setImageFailed(true)}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        ) : (
          <RoomIllustration />
        )}
        <View style={styles.roomImageShade} />
        <View style={styles.roomBadge}>
          <Ionicons name="sparkles" size={12} color={mobileDesign.color.white} />
          <Text style={styles.roomBadgeText}>
            {isDemoRoom
              ? "EXAMPLE ROOM"
              : `${room.conceptCount} ${room.conceptCount === 1 ? "concept" : "concepts"}`}
          </Text>
        </View>
      </View>
      <View style={styles.roomInfo}>
        <View style={styles.roomCopy}>
          <Text numberOfLines={1} style={[styles.roomTitle, { color: colors.foreground }]}>
            {room.title}
          </Text>
          <Text numberOfLines={1} style={[styles.roomMeta, { color: colors.muted }]}>
            {room.roomType} · {room.style} · {room.updatedAt}
          </Text>
        </View>
        <View style={[styles.roomArrow, { backgroundColor: mobileDesign.color.cream }]}>
          <Ionicons name="arrow-forward" size={17} color={colors.primary} />
        </View>
      </View>
    </Pressable>
  );
}

function RoomIllustration() {
  return (
    <View style={styles.illustration}>
      <View style={styles.window}>
        <View style={styles.windowDivider} />
      </View>
      <View style={styles.floorLine} />
      <View style={styles.sofa} />
      <View style={styles.plantStem} />
      <View style={styles.plantLeafLeft} />
      <View style={styles.plantLeafRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 22 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  brandBlock: { flex: 1, paddingRight: 12 },
  eyebrow: { fontSize: 11, fontWeight: "900", letterSpacing: 1.8 },
  title: { fontSize: 34, lineHeight: 38, fontWeight: "800", letterSpacing: -0.9, marginTop: 7 },
  subtitle: { fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 280 },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mobileDesign.color.card,
    borderWidth: 1,
    borderColor: mobileDesign.color.line,
  },
  hero: {
    height: 310,
    borderRadius: 28,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: mobileDesign.color.sage,
  },
  heroFallback: { ...StyleSheet.absoluteFillObject, backgroundColor: "#8B8878" },
  heroFallbackWindow: {
    position: "absolute",
    top: 35,
    right: 28,
    width: 106,
    height: 100,
    borderWidth: 7,
    borderColor: "#F1E9DC",
    backgroundColor: "#D9E1D8",
  },
  heroFallbackSofa: {
    position: "absolute",
    left: 27,
    bottom: 62,
    width: 205,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#75685C",
  },
  heroFallbackPlant: {
    position: "absolute",
    right: 40,
    bottom: 38,
    width: 15,
    height: 68,
    borderRadius: 10,
    backgroundColor: "#687363",
  },
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(28, 27, 24, 0.34)" },
  heroContent: { padding: 20, gap: 8 },
  heroPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "rgba(35, 34, 30, 0.55)",
    marginBottom: 2,
  },
  heroPillText: { color: mobileDesign.color.white, fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  heroTitle: {
    color: mobileDesign.color.white,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    maxWidth: 300,
  },
  heroBody: { color: "#F8F5EF", fontSize: 13, lineHeight: 19, maxWidth: 290 },
  heroButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 15,
    backgroundColor: mobileDesign.color.card,
    paddingHorizontal: 16,
  },
  heroButtonText: { color: mobileDesign.color.ink, fontSize: 14, fontWeight: "800" },
  heroActions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 7 },
  heroSecondaryButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 254, 250, 0.72)",
    paddingHorizontal: 14,
  },
  heroSecondaryButtonText: { color: mobileDesign.color.white, fontSize: 14, fontWeight: "800" },
  summary: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 14,
    paddingHorizontal: 15,
  },
  summaryItem: { flexDirection: "row", alignItems: "baseline", gap: 7, flex: 1 },
  summaryValue: { fontSize: 18, fontWeight: "800" },
  summaryLabel: { fontSize: 11, fontWeight: "600" },
  summaryDivider: { width: 1, height: 28, marginHorizontal: 10 },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: mobileDesign.color.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 27,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 21, lineHeight: 26, fontWeight: "800", letterSpacing: -0.35 },
  sectionSubtitle: { fontSize: 12, lineHeight: 17, marginTop: 3 },
  seeAllButton: { minHeight: 44, flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 4 },
  seeAll: { fontSize: 13, fontWeight: "800" },
  stateCard: {
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
  },
  warningCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 16,
    padding: 13,
    marginBottom: 12,
  },
  warningText: { flex: 1, fontSize: 12, lineHeight: 18 },
  emptyCard: { paddingVertical: 22 },
  stateTitle: { fontSize: 16, lineHeight: 22, textAlign: "center", fontWeight: "800" },
  stateText: { fontSize: 12, lineHeight: 18, textAlign: "center", maxWidth: 285 },
  retryButton: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 18,
    justifyContent: "center",
    marginTop: 2,
  },
  retryText: { fontSize: 13, fontWeight: "800" },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  emptyAction: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  emptyActionText: { color: mobileDesign.color.white, fontSize: 13, fontWeight: "800" },
  roomList: { marginHorizontal: -20 },
  roomCarousel: { gap: 12, paddingHorizontal: 20, paddingBottom: 2 },
  roomCard: { borderWidth: 1, borderRadius: 22, overflow: "hidden" },
  roomImage: { height: 174, overflow: "hidden", backgroundColor: "#D7C8B4" },
  roomImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(24, 23, 21, 0.08)" },
  roomBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 10,
    backgroundColor: "rgba(36,35,31,0.78)",
  },
  roomBadgeText: { color: mobileDesign.color.white, fontSize: 11, fontWeight: "700" },
  roomInfo: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  roomCopy: { flex: 1 },
  roomTitle: { fontSize: 16, fontWeight: "800" },
  roomMeta: { fontSize: 11, marginTop: 4 },
  roomArrow: { width: 38, height: 38, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  illustration: { ...StyleSheet.absoluteFillObject, backgroundColor: "#D9C9B5" },
  window: {
    position: "absolute",
    top: 20,
    right: 25,
    width: 94,
    height: 88,
    borderWidth: 7,
    borderColor: "#F1E9DC",
    backgroundColor: "#DDE5E0",
  },
  windowDivider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 4,
    backgroundColor: "#F1E9DC",
  },
  floorLine: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 29,
    height: 2,
    backgroundColor: "rgba(86,70,54,0.22)",
  },
  sofa: {
    position: "absolute",
    bottom: 33,
    left: 24,
    width: "58%",
    height: 51,
    borderRadius: 14,
    backgroundColor: "#75685C",
  },
  plantStem: {
    position: "absolute",
    right: 42,
    bottom: 29,
    width: 5,
    height: 63,
    borderRadius: 4,
    backgroundColor: "#65705B",
  },
  plantLeafLeft: {
    position: "absolute",
    right: 45,
    bottom: 76,
    width: 27,
    height: 13,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    transform: [{ rotate: "-25deg" }],
    backgroundColor: "#687363",
  },
  plantLeafRight: {
    position: "absolute",
    right: 20,
    bottom: 67,
    width: 27,
    height: 13,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    transform: [{ rotate: "25deg" }],
    backgroundColor: "#687363",
  },
  quickStarts: { gap: 9, paddingRight: 20 },
  quickStart: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 17,
    paddingLeft: 8,
    paddingRight: 12,
  },
  quickStartIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  quickStartText: { fontSize: 12, fontWeight: "700" },
  bottomSpace: { height: 18 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
});
