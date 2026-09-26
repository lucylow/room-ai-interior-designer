import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const suggestions = [
  { title: "Make it feel warmer", subtitle: "Soft lighting + layered textures", icon: "sunny-outline" as const },
  { title: "Make the room feel bigger", subtitle: "Clear visual pathways", icon: "expand-outline" as const },
  { title: "Keep what you own", subtitle: "Rework your layout first", icon: "refresh-outline" as const },
];

export default function HomeScreen() {
  const colors = useColors();
  return (
    <ScreenContainer containerClassName="bg-background" safeAreaClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>RE:ROOM AI</Text>
            <Text style={[styles.title, { color: colors.foreground }]}>A better room{`\n`}starts here.</Text>
          </View>
          <Pressable accessibilityLabel="Open profile" onPress={() => router.push("/(tabs)/profile")} style={({ pressed }) => [styles.avatar, { backgroundColor: "#E8D9C8" }, pressed && styles.pressed]}>
            <Text style={[styles.avatarText, { color: colors.foreground }]}>AR</Text>
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={() => router.push("/(tabs)/create")} style={({ pressed }) => [styles.hero, { backgroundColor: colors.primary }, pressed && styles.heroPressed]}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>YOUR NEXT TRANSFORMATION</Text>
            <Text style={styles.heroTitle}>Redesign the room you already own.</Text>
            <View style={styles.heroButton}><Text style={[styles.heroButtonText, { color: colors.primary }]}>Start with a photo</Text><Ionicons name="arrow-forward" size={16} color={colors.primary} /></View>
          </View>
          <View style={styles.heroOrb}><Ionicons name="sparkles" size={34} color="#F7F3EE" /></View>
        </Pressable>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Continue where you left off</Text><Pressable onPress={() => router.push("/(tabs)/rooms")}><Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text></Pressable></View>
        <Pressable onPress={() => router.push("/(tabs)/create")} style={({ pressed }) => [styles.roomCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
          <View style={[styles.roomImage, { backgroundColor: "#C7B5A4" }]}><View style={styles.window}><View style={styles.windowLine} /></View><View style={styles.sofa} /><View style={styles.plant} /></View>
          <View style={styles.roomInfo}><View><Text style={[styles.roomName, { color: colors.foreground }]}>Living room refresh</Text><Text style={[styles.roomMeta, { color: colors.muted }]}>Modern warm · 2 concepts</Text></View><Ionicons name="chevron-forward" size={20} color={colors.muted} /></View>
        </Pressable>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Try a quick transformation</Text></View>
        {suggestions.map((item) => <Pressable key={item.title} onPress={() => router.push({ pathname: "/(tabs)/create", params: { prompt: item.title } })} style={({ pressed }) => [styles.suggestion, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.suggestionIcon, { backgroundColor: "#E8D9C8" }]}><Ionicons name={item.icon} size={21} color={colors.primary} /></View><View style={styles.suggestionCopy}><Text style={[styles.suggestionTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.suggestionSubtitle, { color: colors.muted }]}>{item.subtitle}</Text></View><Ionicons name="arrow-forward" size={18} color={colors.muted} /></Pressable>)}

        <View style={[styles.proCard, { backgroundColor: "#272421" }]}><View style={styles.proBadge}><Ionicons name="sparkles" size={13} color="#272421" /><Text style={styles.proBadgeText}>PRO</Text></View><Text style={styles.proTitle}>See the room{`\n`}from every angle.</Text><Text style={styles.proBody}>Unlock HD concepts, unlimited variations, and whole-home style memory.</Text><Pressable onPress={() => router.push("/(tabs)/profile")} style={({ pressed }) => [styles.proButton, pressed && styles.pressed]}><Text style={styles.proButtonText}>Explore membership</Text></Pressable></View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 28, gap: 18 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 8 },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 2 },
  title: { fontSize: 34, lineHeight: 39, fontWeight: "800", letterSpacing: -1.2, marginTop: 8 },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 13, fontWeight: "800" },
  hero: { minHeight: 218, borderRadius: 28, padding: 22, flexDirection: "row", overflow: "hidden" },
  heroPressed: { transform: [{ scale: 0.985 }] },
  heroCopy: { flex: 1, justifyContent: "space-between" },
  heroKicker: { color: "#F9EDE5", fontSize: 10, fontWeight: "800", letterSpacing: 1.6 },
  heroTitle: { color: "#FFFDF9", fontSize: 26, lineHeight: 30, fontWeight: "800", letterSpacing: -0.6, maxWidth: 250 },
  heroButton: { backgroundColor: "#FFFDF9", borderRadius: 16, minHeight: 42, paddingHorizontal: 14, alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8 },
  heroButtonText: { fontSize: 13, fontWeight: "800" },
  heroOrb: { position: "absolute", right: -24, bottom: -28, width: 130, height: 130, borderRadius: 65, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  seeAll: { fontSize: 13, fontWeight: "700" },
  roomCard: { borderWidth: 1, borderRadius: 24, overflow: "hidden" },
  roomImage: { height: 156, position: "relative", overflow: "hidden" },
  window: { position: "absolute", top: 18, right: 28, width: 88, height: 76, backgroundColor: "#DDE5E0", borderWidth: 6, borderColor: "#EFE7DA" },
  windowLine: { position: "absolute", left: 38, top: 0, bottom: 0, width: 4, backgroundColor: "#EFE7DA" },
  sofa: { position: "absolute", bottom: 23, left: 24, width: 164, height: 45, borderRadius: 11, backgroundColor: "#75685C" },
  plant: { position: "absolute", bottom: 22, right: 36, width: 16, height: 54, borderRadius: 9, backgroundColor: "#63715E" },
  roomInfo: { padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  roomName: { fontSize: 16, fontWeight: "800" },
  roomMeta: { fontSize: 13, marginTop: 4 },
  suggestion: { borderWidth: 1, borderRadius: 20, minHeight: 72, padding: 12, flexDirection: "row", alignItems: "center", gap: 12 },
  suggestionIcon: { width: 44, height: 44, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  suggestionCopy: { flex: 1 },
  suggestionTitle: { fontSize: 14, fontWeight: "800" },
  suggestionSubtitle: { fontSize: 12, marginTop: 4 },
  proCard: { borderRadius: 24, padding: 20, marginTop: 4 },
  proBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E6C6A9", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
  proBadgeText: { color: "#272421", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  proTitle: { color: "#FFFDF9", fontSize: 24, lineHeight: 27, fontWeight: "800", marginTop: 15 },
  proBody: { color: "#C9C1B9", fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 290 },
  proButton: { marginTop: 18, alignSelf: "flex-start", borderBottomWidth: 1, borderBottomColor: "#E6C6A9", paddingBottom: 4 },
  proButtonText: { color: "#E6C6A9", fontSize: 13, fontWeight: "800" },
  pressed: { opacity: 0.72 },
});
