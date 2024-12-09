import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "expo-router/build/fork/NavigationContainer";
import TabLayout from "@/app/(tabs)/_layout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const checkConnection = async () => {
      setTimeout(() => {
        setIsConnected(false);
      }, 1000);
    };
    checkConnection();
  }, []);

  useEffect(() => {
    if (isConnected !== null) {
      if (isConnected) {
        router.push("(tabs)");
      } else {
        router.push("/(auth)/login");
      }
    }
  }, [isConnected]);

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <NavigationContainer>
    //     {isConnected ? (
    //         <TabLayout />
    //     ) : (
    //         <Stack.Navigator>
    //           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //         </Stack.Navigator>
    //     )}
    //   </NavigationContainer>
    //   <StatusBar style="auto" />
    // </ThemeProvider>

    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(findway)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
