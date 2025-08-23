import { themeConfig } from "@/consts/theme_config";
import { LanguageProvider } from '@/i18n';
import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  const systemScheme = useColorScheme();
  const mode: 'light' | 'dark' = systemScheme === 'dark' ? 'dark' : 'light';
  const mergedTheme = useMemo(() => ({ ...themeConfig, mode }), [mode]);
  return (
    <LanguageProvider>
      {/* @ts-ignore: ignored ts key error, use it update ui forcibly */}
      <ThemeProvider theme={mergedTheme} key={mode}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false, }} />
        </SafeAreaProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
