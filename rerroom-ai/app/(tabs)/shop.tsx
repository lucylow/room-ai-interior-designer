import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import {
  filterShopProducts,
  formatShopPrice,
  shopCategories,
  sortShopProducts,
  type ShopCategory,
  type ShopSort,
} from "@/services/shopCore";
import { loadSavedShopIds, toggleSavedShopId } from "@/services/savedShop";
import {
  createRoomSet,
  fitLabel,
  formatCad,
  roomSetOptions,
  roomSetSubtotal,
  type RoomSetViewModel,
} from "@/services/retailStudio";

export default function ShopScreen() {
  const colors = useColors();
  const { roomId } = useLocalSearchParams<{ roomId?: string }>();
  const [category, setCategory] = React.useState<ShopCategory>("All");
  const [sort, setSort] = React.useState<ShopSort>("recommended");
  const [maxPrice, setMaxPrice] = React.useState(1000);
  const [savedIds, setSavedIds] = React.useState<string[]>([]);
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const initialRoom =
    roomId && roomSetOptions.some((item) => item.id === roomId) ? roomId : roomSetOptions[0]?.id;
  const [selectedRoomId, setSelectedRoomId] = React.useState(initialRoom);
  const [roomSet, setRoomSet] = React.useState<RoomSetViewModel>(() =>
    createRoomSet(initialRoom ?? roomSetOptions[0].id),
  );
  const [viewMode, setViewMode] = React.useState<"2D" | "3D">("2D");

  React.useEffect(() => {
    let active = true;
    loadSavedShopIds(roomId).then((ids) => {
      if (active) setSavedIds(ids);
    });
    return () => {
      active = false;
    };
  }, [roomId]);
  const products = sortShopProducts(filterShopProducts(category, maxPrice), sort);
  const subtotal = roomSetSubtotal(roomSet.products);
  const remaining = roomSet.hardCap - subtotal;
  function selectRoom(id: string) {
    setSelectedRoomId(id);
    setRoomSet(createRoomSet(id));
  }
  async function toggleSaved(id: string) {
    setSaveError(null);
    try {
      setSavedIds(await toggleSavedShopId(id, roomId));
    } catch {
      setSaveError("Your shortlist could not be saved on this device.");
    }
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>SHOPPING STUDIO</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open saved pieces"
            hitSlop={8}
            onPress={() => router.push(roomId ? { pathname: "/saved", params: { roomId } } : "/saved")}
          >
            <Ionicons name="heart-outline" size={22} color={colors.primary} />
          </Pressable>
        </View>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
          Make the room buyable.
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Build a grounded room set, test smaller or cheaper swaps, then recheck everything before checkout.
        </Text>
        <Text style={[styles.section, { color: colors.foreground }]}>Room-set generation</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.roomPicker}
        >
          {roomSetOptions.map((option) => (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedRoomId === option.id }}
              onPress={() => selectRoom(option.id)}
              style={[
                styles.roomChip,
                {
                  borderColor: selectedRoomId === option.id ? colors.primary : colors.border,
                  backgroundColor: selectedRoomId === option.id ? "#F0DED4" : colors.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.roomChipTitle,
                  { color: selectedRoomId === option.id ? colors.primary : colors.foreground },
                ]}
              >
                {option.name}
              </Text>
              <Text style={[styles.roomChipMeta, { color: colors.muted }]}>
                {option.style} · {formatCad(option.budget)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={[styles.studioCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.studioTop}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardEyebrow, { color: colors.primary }]}>GENERATED ROOM SET</Text>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>{roomSet.room.name}</Text>
              <Text style={[styles.cardBody, { color: colors.muted }]}>
                Anchors stay fixed while furniture experiments remain reversible overlays.
              </Text>
            </View>
            <View
              style={[styles.scoreBadge, { backgroundColor: roomSet.checkout.ready ? "#E8F0E6" : "#F8E6DC" }]}
            >
              <Text
                style={[
                  styles.scoreText,
                  { color: roomSet.checkout.ready ? colors.primary : colors.warning },
                ]}
              >
                {roomSet.checkout.ready ? "READY" : "RECHECK"}
              </Text>
            </View>
          </View>
          <View style={styles.modeRow}>
            <View style={styles.modeGroup}>
              {(["2D", "3D"] as const).map((mode) => (
                <Pressable
                  key={mode}
                  accessibilityRole="button"
                  accessibilityState={{ selected: viewMode === mode }}
                  onPress={() => setViewMode(mode)}
                  style={[
                    styles.modeChip,
                    { backgroundColor: viewMode === mode ? colors.primary : colors.background },
                  ]}
                >
                  <Ionicons
                    name={mode === "2D" ? "scan-outline" : "cube-outline"}
                    size={14}
                    color={viewMode === mode ? "#FFFDF9" : colors.muted}
                  />
                  <Text
                    style={[styles.modeText, { color: viewMode === mode ? "#FFFDF9" : colors.foreground }]}
                  >
                    {mode} experiment
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={[styles.snapshot, { color: colors.muted }]}>Snapshot · {roomSet.snapshotDate}</Text>
          </View>
          <View style={styles.budgetRow}>
            <View>
              <Text style={[styles.budgetLabel, { color: colors.muted }]}>ROOM SET</Text>
              <Text style={[styles.budgetValue, { color: colors.foreground }]}>{formatCad(subtotal)}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.budgetLabel, { color: colors.muted }]}>HARD CAP</Text>
              <Text style={[styles.remaining, { color: remaining >= 0 ? colors.primary : colors.error }]}>
                {remaining >= 0 ? `${formatCad(remaining)} left` : `${formatCad(Math.abs(remaining))} over`}
              </Text>
            </View>
          </View>
          {roomSet.products.map((product) => (
            <View key={product.id} style={[styles.setItem, { borderTopColor: colors.border }]}>
              <View
                style={[
                  styles.itemDot,
                  {
                    backgroundColor:
                      product.colors[0] === "black"
                        ? "#33302D"
                        : product.colors[0] === "oak"
                          ? "#B98A5F"
                          : "#D8D0C4",
                  },
                ]}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemName, { color: colors.foreground }]}>{product.name}</Text>
                <Text style={[styles.itemMeta, { color: colors.muted }]}>
                  {product.category} · {fitLabel(product)}
                </Text>
              </View>
              <Text style={[styles.itemPrice, { color: colors.foreground }]}>
                {formatCad(product.price.amount)}
              </Text>
            </View>
          ))}
          {roomSet.alternatives.length > 0 ? (
            <View style={[styles.alternatives, { backgroundColor: "#F7EEE7" }]}>
              <Ionicons name="swap-horizontal-outline" size={18} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.altTitle, { color: colors.foreground }]}>
                  Cheaper or smaller alternatives ready
                </Text>
                <Text style={[styles.altBody, { color: colors.muted }]}>
                  {roomSet.alternatives
                    .slice(0, 2)
                    .map((item) => item.name)
                    .join(" · ")}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={[styles.checkoutPanel, { borderColor: colors.border }]}>
            <View style={styles.checkoutHeader}>
              <Text style={[styles.checkoutTitle, { color: colors.foreground }]}>Checkout-readiness</Text>
              <Text
                style={[
                  styles.checkoutScore,
                  { color: roomSet.checkout.ready ? colors.primary : colors.warning },
                ]}
              >
                {Math.round(roomSet.checkout.score * 100)}%
              </Text>
            </View>
            <Text style={[styles.checkoutBody, { color: colors.muted }]}>
              {roomSet.checkout.ready
                ? "Budget is within the hard cap. Recheck availability, delivery, taxes, and final price at the retailer."
                : roomSet.checkout.blockers[0]}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Recheck retailer details before checkout"
              onPress={() => setRoomSet(createRoomSet(selectedRoomId))}
              style={[styles.recheckButton, { borderColor: colors.primary }]}
            >
              <Ionicons name="refresh-outline" size={15} color={colors.primary} />
              <Text style={[styles.recheckText, { color: colors.primary }]}>Recheck retailer details</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.budgetCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.budgetTop}>
            <View>
              <Text style={[styles.budgetLabel, { color: colors.muted }]}>YOUR WORKING BUDGET</Text>
              <Text style={[styles.budgetValue, { color: colors.foreground }]}>
                {formatShopPrice(maxPrice)}
              </Text>
            </View>
            <View style={[styles.budgetIcon, { backgroundColor: "#E8D9C8" }]}>
              <Ionicons name="wallet-outline" size={20} color={colors.primary} />
            </View>
          </View>
          <View style={styles.budgetOptions}>
            {[500, 1000, 2500].map((value) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                accessibilityState={{ selected: maxPrice === value }}
                onPress={() => setMaxPrice(value)}
                style={[
                  styles.budgetChip,
                  {
                    borderColor: maxPrice === value ? colors.primary : colors.border,
                    backgroundColor: maxPrice === value ? "#F0DED4" : colors.background,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.budgetChipText,
                    { color: maxPrice === value ? colors.primary : colors.foreground },
                  ]}
                >
                  {formatShopPrice(value)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Text style={[styles.section, { color: colors.foreground }]}>Browse catalog snapshot</Text>
        {saveError ? (
          <Text accessibilityRole="alert" style={[styles.saveError, { color: colors.error }]}>
            {saveError}
          </Text>
        ) : null}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {shopCategories.map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: category === item }}
              onPress={() => setCategory(item)}
              style={[
                styles.filter,
                {
                  borderColor: category === item ? colors.primary : colors.border,
                  backgroundColor: category === item ? colors.primary : colors.surface,
                },
              ]}
            >
              <Text style={[styles.filterText, { color: category === item ? "#FFFDF9" : colors.foreground }]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.resultRow}>
          <Text style={[styles.section, { color: colors.foreground, marginBottom: 0 }]}>
            For this direction
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change product sort order"
            onPress={() =>
              setSort((current) =>
                current === "recommended"
                  ? "price-low"
                  : current === "price-low"
                    ? "price-high"
                    : "recommended",
              )
            }
          >
            <Text style={[styles.sortText, { color: colors.primary }]}>
              {sort === "recommended" ? "Recommended" : sort === "price-low" ? "Price: low" : "Price: high"}
            </Text>
          </Pressable>
        </View>
        {products.map((item) => {
          const saved = savedIds.includes(item.id);
          return (
            <View
              key={item.id}
              style={[styles.productCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.productVisual, { backgroundColor: item.palette }]}>
                <Ionicons
                  name={
                    item.category === "Lighting"
                      ? "bulb-outline"
                      : item.category === "Storage"
                        ? "albums-outline"
                        : item.category === "Textiles"
                          ? "grid-outline"
                          : "flower-outline"
                  }
                  size={34}
                  color="rgba(255,253,249,0.82)"
                />
                <Text style={styles.visualCategory}>{item.category.toUpperCase()}</Text>
              </View>
              <View style={styles.productInfo}>
                <View style={styles.productTop}>
                  <View style={{ flex: 1 }}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`View details for ${item.name}`}
                      onPress={() =>
                        router.push({
                          pathname: "/product/[id]",
                          params: { id: item.id, ...(roomId ? { roomId } : {}) },
                        })
                      }
                    >
                      <Text style={[styles.productName, { color: colors.foreground }]}>{item.name}</Text>
                    </Pressable>
                    <Text style={[styles.productDetail, { color: colors.muted }]}>{item.detail}</Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={saved ? `Remove ${item.name} from saved items` : `Save ${item.name}`}
                    onPress={() => void toggleSaved(item.id)}
                  >
                    <Ionicons
                      name={saved ? "heart" : "heart-outline"}
                      size={22}
                      color={saved ? colors.primary : colors.muted}
                    />
                  </Pressable>
                </View>
                <Text style={[styles.fit, { color: colors.primary }]}>{item.fit}</Text>
                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: colors.foreground }]}>
                    {formatShopPrice(item.price)}
                  </Text>
                  <Pressable accessibilityRole="button" onPress={() => void toggleSaved(item.id)}>
                    <Text style={[styles.viewText, { color: colors.primary }]}>
                      {saved ? "Saved" : "Save piece"}{" "}
                      <Ionicons
                        name={saved ? "checkmark" : "arrow-forward"}
                        size={13}
                        color={colors.primary}
                      />
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
        {products.length === 0 ? (
          <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No pieces in this range</Text>
            <Text style={[styles.emptyBody, { color: colors.muted }]}>
              Try a wider budget or another category.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 36 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  eyebrow: { fontSize: 11, fontWeight: "900", letterSpacing: 1.6 },
  title: { fontSize: 32, lineHeight: 37, fontWeight: "800" },
  subtitle: { fontSize: 15, lineHeight: 21, marginTop: 10, marginBottom: 22 },
  section: { fontSize: 18, fontWeight: "800", marginBottom: 12, marginTop: 8 },
  roomPicker: { gap: 8, paddingBottom: 15 },
  roomChip: { minWidth: 188, borderWidth: 1, borderRadius: 16, padding: 12 },
  roomChipTitle: { fontSize: 13, fontWeight: "800" },
  roomChipMeta: { fontSize: 11, marginTop: 4 },
  studioCard: { borderWidth: 1, borderRadius: 20, padding: 15, marginBottom: 20 },
  studioTop: { flexDirection: "row", gap: 10 },
  cardEyebrow: { fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  cardTitle: { fontSize: 19, fontWeight: "800", marginTop: 4 },
  cardBody: { fontSize: 12, lineHeight: 17, marginTop: 5 },
  scoreBadge: {
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: { fontSize: 10, fontWeight: "900" },
  modeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 8,
  },
  modeGroup: { flexDirection: "row", gap: 6 },
  modeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  modeText: { fontSize: 10, fontWeight: "800" },
  snapshot: { fontSize: 10 },
  budgetRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18, paddingBottom: 10 },
  budgetLabel: { fontSize: 10, letterSpacing: 1.2, fontWeight: "900" },
  budgetValue: { fontSize: 23, fontWeight: "800", marginTop: 3 },
  remaining: { fontSize: 15, fontWeight: "800", marginTop: 6 },
  setItem: { flexDirection: "row", alignItems: "center", gap: 9, borderTopWidth: 1, paddingVertical: 10 },
  itemDot: { width: 28, height: 28, borderRadius: 9 },
  itemName: { fontSize: 12, fontWeight: "800" },
  itemMeta: { fontSize: 10, marginTop: 3 },
  itemPrice: { fontSize: 12, fontWeight: "800" },
  alternatives: { borderRadius: 14, padding: 11, flexDirection: "row", gap: 8, marginTop: 7 },
  altTitle: { fontSize: 12, fontWeight: "800" },
  altBody: { fontSize: 10, marginTop: 3 },
  checkoutPanel: { borderWidth: 1, borderRadius: 14, padding: 11, marginTop: 12 },
  checkoutHeader: { flexDirection: "row", justifyContent: "space-between" },
  checkoutTitle: { fontSize: 12, fontWeight: "800" },
  checkoutScore: { fontSize: 12, fontWeight: "900" },
  checkoutBody: { fontSize: 11, lineHeight: 16, marginTop: 5 },
  recheckButton: {
    borderWidth: 1,
    borderRadius: 11,
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 7,
    marginTop: 9,
  },
  recheckText: { fontSize: 10, fontWeight: "800" },
  budgetCard: { borderWidth: 1, borderRadius: 20, padding: 15, marginBottom: 22 },
  budgetTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  budgetIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  budgetOptions: { flexDirection: "row", gap: 8, marginTop: 15 },
  budgetChip: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 9 },
  budgetChipText: { fontSize: 12, fontWeight: "800" },
  filters: { gap: 8, paddingBottom: 18 },
  filter: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10 },
  filterText: { fontSize: 13, fontWeight: "800" },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sortText: { fontSize: 12, fontWeight: "800" },
  productCard: { borderWidth: 1, borderRadius: 19, overflow: "hidden", marginBottom: 12 },
  productVisual: { height: 108, alignItems: "center", justifyContent: "center", gap: 5 },
  visualCategory: { color: "#FFFDF9", fontSize: 9, fontWeight: "900", letterSpacing: 1.4 },
  productInfo: { padding: 14 },
  productTop: { flexDirection: "row", gap: 12 },
  productName: { fontSize: 15, fontWeight: "800" },
  productDetail: { fontSize: 12, marginTop: 3 },
  fit: { fontSize: 11, fontWeight: "800", marginTop: 12 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  price: { fontSize: 17, fontWeight: "800" },
  viewText: { fontSize: 12, fontWeight: "800" },
  empty: { borderWidth: 1, borderRadius: 18, padding: 22, alignItems: "center", gap: 7 },
  emptyTitle: { fontSize: 15, fontWeight: "800" },
  emptyBody: { fontSize: 12 },
  saveError: { fontSize: 12, fontWeight: "700", marginBottom: 12 },
});
