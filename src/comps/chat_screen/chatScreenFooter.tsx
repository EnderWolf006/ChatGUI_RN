import { t } from "@/i18n";
import Lucide from "@react-native-vector-icons/lucide";
import { Button, Icon, useTheme } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import { Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function ChatScreenFooter() {
  const { theme } = useTheme();
  const [value, setValue] = useState('');
  return <View style={{
    padding: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    backgroundColor: theme.colors.white
  }}>
    <Button
      buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 48, width: 48, backgroundColor: theme.colors.background }}
      radius={24}
      type='clear'
      onPress={() => {
        console.log('New chat pressed');
      }}
    >
      <Lucide name='images' size={22} color={theme.colors.grey5} />
    </Button>
    <View style={{
      backgroundColor: theme.colors.background,
      flex: 1,
      gap: 12,
      flexDirection: 'row',
      borderRadius: 22,
      alignItems: 'flex-end',
      paddingHorizontal: 8,
    }}>
      <TextInput
        style={{
          flex: 1,
          maxHeight: 120,
          paddingHorizontal: 10,
          paddingVertical: 14,
          borderRadius: 14,
          color: theme.colors.black,
          fontSize: 16,
          lineHeight: 20,
        }}
        placeholderTextColor={theme.colors.grey4}
        placeholder={t('chat.footer.placeholder')}
        multiline
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => { Keyboard.dismiss(); }}
        textAlignVertical="top"
      />
      <Button
        containerStyle={{ marginBottom: 7 }}
        buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 34, width: 34 }}
        radius={26}
        type='clear'
        onPress={() => {
          console.log('New chat pressed');
        }}
      >
        <Icon type="ionicon" name="mic-outline" color={theme.colors.grey4}></Icon>
      </Button>
      <Button
        containerStyle={{ marginBottom: 7 }}
        buttonStyle={{ paddingVertical: 0, paddingHorizontal: 0, height: 34, width: 34, backgroundColor: theme.colors.black }}
        radius={26}
        type='clear'
        onPress={() => {
          console.log('New chat pressed');
        }}
      >
        <Icon type="ionicon" name="arrow-up-outline" color={theme.colors.white}></Icon>
      </Button>
    </View>
  </View>;
}