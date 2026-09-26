import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";

export default function TabsLayout() {
  const colors = useColors();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 78,
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="create" options={{ title: "Create", tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="rooms" options={{ title: "Rooms", tabBarIcon: ({ color, size }) => <Ionicons name="albums-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="discover" options={{ title: "Discover", tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
