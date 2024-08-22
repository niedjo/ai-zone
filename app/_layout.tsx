import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalProvider } from '@/context/GlobalProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    if (error) throw error;
    if (fontLoaded) SplashScreen.hideAsync();
    
  }, [fontLoaded, error])

  if (!fontLoaded && !error) return 

  return (
    <GlobalProvider>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
        <Stack
          // en realite on peux tous simplement mettre le headerShown a false
          // screenOptions={{
          //   headerShown : false
          // }}
        >
          <Stack.Screen 
            options={{
              headerShown : false
            }}
            name="index" 
          />
          <Stack.Screen 
            options={{
              headerShown : false
            }}
            name="(auth)" 
          />
          <Stack.Screen 
            options={{
              headerShown : false
            }}
            name="(tabs)" 
          />
          <Stack.Screen 
            options={{
              headerShown : false
            }}
            name="search/[query]" 
          />
        </Stack>
      {/* </ThemeProvider> */}
    </GlobalProvider>
  );
}
