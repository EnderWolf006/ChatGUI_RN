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
      {/* @ts-ignore: 忽略 key 报错，使用 key 以在主题模式变化时强制重新挂载 */}
      <ThemeProvider theme={mergedTheme} key={mode}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false, }} />
        </SafeAreaProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
