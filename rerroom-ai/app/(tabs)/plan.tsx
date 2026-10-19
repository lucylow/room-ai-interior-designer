import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { mobileDesign } from "@/constants/mobile-design";
import { useColors } from "@/hooks/use-colors";
import { loadSavedDesignsWithStatus, type SavedDesign } from "@/services/savedDesigns";
import { formatCad } from "@/services/retailStudio";

type LoadState = "loading" | "ready" | "error";

export default function PlanScreen() {
  const colors = useColors();
  const [rooms, setRooms] = useState<SavedDesign[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [isDemoData, setIsDemoData] = useState(false);
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setLoadState("loading");
    try {
      const result = await loadSavedDesignsWithStatus();
      if (currentRequest !== requestId.current) return;
      setRooms(result.designs);
      setIsDemoData(result.source === "demo");
      setLoadState(result.source === "unavailable" ? "error" : "ready");
    } catch {
      if (currentRequest !== requestId.current) return;
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    void refresh();
    return () => {
      requestId.current += 1;
    };
  }, [refresh]);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>FROM IDEA TO REAL ROOM</Text>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
          Plan your next step.
        </Text>
        <Text style={[styles.intro, { color: colors.muted }]}>
          Your plan stays connected to the rooms and budgets you have actually saved.
        </Text>

        <View style={[styles.promiseCard, { backgroundColor: mobileDesign.color.ink }]}>
          <View style={styles.promiseIcon}>
            <Ionicons name="list-outline" size={21} color={mobileDesign.color.ink} />
          </View>
          <View style={styles.promiseCopy}>
            <Text style={styles.promiseTitle}>One room at a time</Text>
            <Text style={styles.promiseBody}>
              Continue refining, explore pieces, and keep your room context with you.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.foreground }]}>
              Rooms to plan
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
              {isDemoData ? "Example data from demo mode." : "Based on rooms saved on this device."}
            </Text>
          </View>
          {loadState === "ready" && rooms.length > 0 ? (
            <View style={[styles.countPill, { backgroundColor: mobileDesign.color.cream }]}>
              <Text style={[styles.countText, { color: colors.primary }]}>{rooms.length}</Text>
            </View>
          ) : null}
        </View>

        {loadState === "loading" ? (
          <View
            accessibilityRole="progressbar"
            accessibilityLabel="Loading saved plans"
            style={[styles.stateCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <ActivityIndicator color={colors.primary} />
            <Text style={[styles.stateBody, { color: colors.muted }]}>Loading your saved rooms…</Text>
          </View>
        ) : loadState === "error" ? (
          <View
            accessibilityRole="alert"
            style={[styles.stateCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Ionicons name="cloud-offline-outline" size={26} color={colors.error} />
            <Text style={[styles.stateTitle, { color: colors.foreground }]}>
              Plans aren’t available right now
            </Text>
            <Text style={[styles.stateBody, { color: colors.muted }]}>
              Your saved work has not been changed. Try loading it again.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => void refresh()}
              style={[styles.retry, { borderColor: colors.primary }]}
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
              <Ionicons name="home-outline" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.stateTitle, { color: colors.foreground }]}>
              Start with a room you want to change
            </Text>
            <Text style={[styles.stateBody, { color: colors.muted }]}>
              Save a design to keep its concepts and any budget you enter together. We will not invent project
              dates or costs.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(tabs)/create")}
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.primaryButtonText}>Capture or choose a photo</Text>
              <Ionicons name="arrow-forward" size={16} color={mobileDesign.color.white} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.roomList}>
            {rooms.map((room) => (
              <View
                key={room.id}
                style={[styles.roomCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={styles.roomHeading}>
                  <View style={[styles.roomIcon, { backgroundColor: mobileDesign.color.cream }]}>
                    <Ionicons name="home-outline" size={19} color={colors.primary} />
                  </View>
                  <View style={styles.roomTitleBlock}>
                    <Text numberOfLines={2} style={[styles.roomTitle, { color: colors.foreground }]}>
                      {room.title}
                    </Text>
                    <Text numberOfLines={1} style={[styles.roomMeta, { color: colors.muted }]}>
                      {room.roomType} · {room.style}
                    </Text>
                  </View>
                  {isDemoData ? (
                    <View style={[styles.examplePill, { backgroundColor: mobileDesign.color.cream }]}>
                      <Text style={[styles.exampleText, { color: colors.primary }]}>EXAMPLE</Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.detailsRow,
                    { borderTopColor: colors.border, borderBottomColor: colors.border },
                  ]}
                >
                  <View style={styles.detailItem}>
                    <Text style={[styles.detailLabel, { color: colors.muted }]}>
                      {isDemoData ? "EXAMPLE CONCEPTS" : "SAVED CONCEPTS"}
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.foreground }]}>
                      {room.conceptCount}
                    </Text>
                  </View>
                  <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
                  <View style={styles.detailItem}>
                    <Text style={[styles.detailLabel, { color: colors.muted }]}>
                      {isDemoData ? "EXAMPLE BUDGET" : "SAVED BUDGET"}
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.foreground }]}>
                      {room.budget ? formatCad(room.budget) : "Not set"}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.updated, { color: colors.muted }]}>Last saved: {room.updatedAt}</Text>
                <View style={styles.actions}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Continue designing ${room.title}`}
                    onPress={() => router.push({ pathname: "/room/[id]", params: { id: room.id } })}
                    style={({ pressed }) => [
                      styles.secondaryButton,
                      { borderColor: colors.border },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons name="color-wand-outline" size={17} color={colors.primary} />
                    <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>Continue</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Shop for ${room.title}`}
                    accessibilityHint="Opens the room-aware product catalog"
                    onPress={() => router.push({ pathname: "/shop", params: { roomId: room.id } })}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      styles.shopButton,
                      { backgroundColor: colors.primary },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Ionicons name="bag-outline" size={16} color={mobileDesign.color.white} />
                    <Text style={styles.primaryButtonText}>Find pieces</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 26 },
  eyebrow: { fontSize: 11, fontWeight: "900", letterSpacing: 1.7 },
  title: { fontSize: 32, lineHeight: 38, fontWeight: "800", letterSpacing: -0.7, marginTop: 8 },
  intro: { fontSize: 14, lineHeight: 21, marginTop: 8, maxWidth: 340 },
  promiseCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderRadius: 22,
    padding: 17,
    marginTop: 22,
  },
  promiseIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mobileDesign.color.sand,
  },
  promiseCopy: { flex: 1 },
  promiseTitle: { color: mobileDesign.color.white, fontSize: 15, fontWeight: "800" },
  promiseBody: { color: "#E2DDD4", fontSize: 12, lineHeight: 18, marginTop: 4 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: "800", letterSpacing: -0.3 },
  sectionSubtitle: { fontSize: 12, lineHeight: 17, marginTop: 3 },
  countPill: { minWidth: 34, height: 34, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  countText: { fontSize: 13, fontWeight: "900" },
  stateCard: {
    minHeight: 170,
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emptyCard: { minHeight: 250 },
  stateTitle: { fontSize: 17, lineHeight: 22, fontWeight: "800", textAlign: "center" },
  stateBody: { fontSize: 13, lineHeight: 19, textAlign: "center", maxWidth: 300 },
  emptyIcon: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  retry: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 18,
    justifyContent: "center",
    marginTop: 3,
  },
  retryText: { fontSize: 13, fontWeight: "800" },
  primaryButton: {
    minHeight: 46,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  primaryButtonText: { color: mobileDesign.color.white, fontSize: 13, fontWeight: "800" },
  roomList: { gap: 12 },
  roomCard: { borderWidth: 1, borderRadius: 22, padding: 15 },
  roomHeading: { flexDirection: "row", alignItems: "center", gap: 10 },
  roomIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  roomTitleBlock: { flex: 1 },
  roomTitle: { fontSize: 15, lineHeight: 20, fontWeight: "800" },
  roomMeta: { fontSize: 12, marginTop: 3 },
  examplePill: {
    minHeight: 28,
    borderRadius: 999,
    paddingHorizontal: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  exampleText: { fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    marginTop: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
  detailValue: { fontSize: 14, fontWeight: "800", marginTop: 5 },
  detailDivider: { width: 1, height: 29, marginHorizontal: 12 },
  updated: { fontSize: 11, marginTop: 10 },
  actions: { flexDirection: "row", gap: 9, marginTop: 12 },
  secondaryButton: {
    minHeight: 46,
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },
  secondaryButtonText: { fontSize: 13, fontWeight: "800" },
  shopButton: { flex: 1, marginTop: 0 },
  bottomSpace: { height: 20 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.985 }] },
});
