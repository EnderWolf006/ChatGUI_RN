import SafeView from "@/comps/safeView";
import { t } from "@/i18n";
import Lucide from "@react-native-vector-icons/lucide";
import { Button, Icon, Text, useTheme } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeView style={{ flex: 1, backgroundColor: theme.colors.white }}>

        <Header />

        <View style={{
          flex: 1,
          borderTopWidth: 0.66,
          borderColor: theme.colors.grey3 + '26',
          borderBottomWidth: 0.66,
        }}>
          <Content />
        </View>

        <FooterInput />

      </SafeView >
    </TouchableWithoutFeedback>
  );
}

function Content() {
  return <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 12 }}></View>

}

function FooterInput() {
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
      <Lucide name='images' size={22} color={theme.colors.grey2} />
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
          paddingHorizontal: 12,
          paddingVertical: 14,
          borderRadius: 14,
          color: theme.colors.black,
          fontSize: 16,
          lineHeight: 20,
        }}
        placeholderTextColor={theme.colors.grey2}
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
        <Icon type="ionicon" name="mic-outline" color={theme.colors.grey2}></Icon>
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

function Header() {
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
      <Icon name="keyboard-arrow-down" type="material" containerStyle={{ right: 1, top: 1 }} color={theme.colors.grey2} />
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
      <Lucide name='square-pen' size={22} color={theme.colors.grey2} />
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
      <Icon name="ellipsis-vertical" type="ionicon" size={22} color={theme.colors.grey2} />
    </Button>
  </View>
}