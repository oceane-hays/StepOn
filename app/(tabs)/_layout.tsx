import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  console.log("jhbfiusbf");
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5E83C0",
        tabBarInactiveTintColor: "#8e8e8e",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "map-marker" : "map"}
              color={color}
              size={24} // Ajustez la taille de l'icône
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
              size={24} // Ajustez la taille de l'icône
            />
          ),
        }}
      />
    </Tabs>
  );
}
