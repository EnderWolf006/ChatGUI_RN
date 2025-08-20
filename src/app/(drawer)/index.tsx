import { Text, useTheme } from "@rneui/themed";
import { View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  return <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
    <Text>11</Text>
  </View>
}