import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Image } from "react-native";
import { Colors } from "@/services/COLORS";
import {BlurView} from "expo-blur";

const customTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -10,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 3.84,
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        paddingBottom: 10,
        backgroundColor: Colors.orange_fonce,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5E83C0",
        tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#E8AA4A",
              opacity: 0.8,
          },
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
        name="route"
        options={{
          title: "",
          tabBarIcon: () => (
            <Image
              source={require("./../../assets/images/location.png")}
              style={{ height: 40, width: 40, alignSelf: "center" }}
            />
          ),
          tabBarButton: (props) => customTabBarButton({ ...props }),
        }}
      />

      <Tabs.Screen
        name="discoverScreen"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "web" : "web"}
              color={color}
              size={24}
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
                    size={24}
                />
            ),
        }}
      />

    </Tabs>
  );
}
