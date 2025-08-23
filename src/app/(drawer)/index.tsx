import { ChatScreenContent } from "@/comps/chat_screen/chatScreenContent";
import { ChatScreenFooter } from "@/comps/chat_screen/chatScreenFooter";
import { ChatScreenHeader } from "@/comps/chat_screen/chatScreenHeader";
import SafeView from "@/comps/safeView";
import useScrollPosition from "@/hooks/useScrollPosition";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
  const { theme } = useTheme();
  const ref = useRef<ScrollView>(null);
  const { isAtTop, isAtBottom, checkScrollPosition } = useScrollPosition({});

  console.log('isAtTop:', isAtTop, 'isAtBottom:', isAtBottom);
  
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeView style={{ flex: 1, backgroundColor: theme.colors.white }}>

        <ChatScreenHeader />

        <View style={{
          flex: 1,
          borderTopWidth: isAtTop ? 0 : 1,
          borderColor: theme.colors.grey0,
          borderBottomWidth: isAtBottom ? 0 : 1,
        }}>
          <ChatScreenContent onScroll={checkScrollPosition} />
        </View>

        <ChatScreenFooter />

      </SafeView >
    </TouchableWithoutFeedback>
  );
}