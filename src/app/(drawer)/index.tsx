import { ChatScreenContent } from "@/comps/chat_screen/chatScreenContent";
import { ChatScreenFooter } from "@/comps/chat_screen/chatScreenFooter";
import { ChatScreenHeader } from "@/comps/chat_screen/chatScreenHeader";
import SafeView from "@/comps/safeView";
import { useTheme } from "@rneui/themed";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeView style={{ flex: 1, backgroundColor: theme.colors.white }}>

        <ChatScreenHeader />

        <View style={{
          flex: 1,
          borderTopWidth: 0.66,
          borderColor: theme.colors.grey3 + '26',
          borderBottomWidth: 0.66,
        }}>
          <ChatScreenContent />
        </View>

        <ChatScreenFooter />

      </SafeView >
    </TouchableWithoutFeedback>
  );
}