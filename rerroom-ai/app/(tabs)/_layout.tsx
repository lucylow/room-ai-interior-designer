import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { mobileDesign } from "@/constants/mobile-design";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: mobileDesign.color.clay,
        tabBarInactiveTintColor: mobileDesign.color.muted,
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: mobileDesign.color.paper },
        tabBarStyle: {
          backgroundColor: mobileDesign.color.card,
          borderTopColor: mobileDesign.color.line,
          minHeight: 64,
          paddingTop: 7,
          paddingBottom: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
        tabBarItemStyle: { minHeight: mobileDesign.touchTarget },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarAccessibilityLabel: "Home, main destination",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Scan",
          tabBarAccessibilityLabel: "Scan or create a room design",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "scan" : "scan-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: "Studio",
          tabBarAccessibilityLabel: "Studio, saved rooms and designs",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "cube" : "cube-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarAccessibilityLabel: "Shop products for your room",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "bag" : "bag-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          tabBarAccessibilityLabel: "Plan your room project",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "clipboard" : "clipboard-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="discover" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
