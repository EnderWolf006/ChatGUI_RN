import Lucide from "@react-native-vector-icons/lucide";
import { Button, Icon, Text, useTheme } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { Pressable, View } from "react-native";

export function ChatScreenHeader() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return <View style={{
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
  }}>
    {/* Expand drawer */}
    <Button
      radius={19}
      onPress={() => (navigation as any)?.openDrawer?.()}
      buttonStyle={{
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: 38,
        width: 38,
      }}>
      <Lucide name='align-left' size={24} color={theme.colors.black}></Lucide>
    </Button>

    {/* Model name & Switch model */}
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.6 },
        { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-start', paddingRight: 14 }
      ]}
      onPress={() => console.log('Pressed!')} >
      <Text
        numberOfLines={1}
        style={{ fontSize: 18, fontWeight: '700', color: theme.colors.black, }}
      >Gemini-2.5-pro</Text>
      <Icon name="keyboard-arrow-down" type="material" containerStyle={{ right: 1, top: 1 }} color={theme.colors.grey4} />
    </Pressable>

    {/* New chat */}
    <Button
      buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 38, width: 38 }}
      radius={19}
      type='clear'
      onPress={() => {
        console.log('New chat pressed');
      }}
    >
      <Lucide name='square-pen' size={22} color={theme.colors.grey5} />
    </Button>

    {/* More */}
    <Button
      buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 38, width: 38 }}
      radius={19}
      type='clear'
      onPress={() => {
        console.log('More pressed');
      }}
    >
      <Icon name="ellipsis-vertical" type="ionicon" size={22} color={theme.colors.grey5} />
    </Button>
  </View>
}