import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {NavigationContainer} from "expo-router/build/fork/NavigationContainer";
import TabLayout from "@/app/(tabs)/_layout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const isConnected = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


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

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName={isConnected ? '(tabs)' : '(auth)'}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(findway)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}

