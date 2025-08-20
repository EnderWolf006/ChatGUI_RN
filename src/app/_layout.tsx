import { themeConfig } from "@/const/theme_config";
import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import 'react-native-gesture-handler';


export default function RootLayout() {
  const systemScheme = useColorScheme();
  const mode: 'light' | 'dark' = systemScheme === 'dark' ? 'dark' : 'light';
  const mergedTheme = useMemo(() => ({ ...themeConfig, mode }), [mode]);
  return (
    // @ts-ignore: 忽略 key 报错，使用 key 以在主题模式变化时强制重新挂载
    <ThemeProvider theme={mergedTheme} key={mode}>
      <Stack screenOptions={{ headerShown: false, }} />
    </ThemeProvider>
  );
}
