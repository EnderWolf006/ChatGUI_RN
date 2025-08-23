import { Button, Text, useTheme } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";


const CHAT_GLOBAL_HORIZONTAL_PADDING = 16;


interface ChatScreenContentProps {
  ref?: React.Ref<ScrollView>;
  onScroll?: (nativeEvent: any) => void;
}
export function ChatScreenContent({ ref, onScroll }: ChatScreenContentProps) {
  return (
    <ScrollView
      ref={ref}
      style={{ flex: 1 }}
      onScroll={onScroll ? (event) => onScroll(event.nativeEvent) : undefined}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ gap: 14 }}
    >
      {new Array(15).fill(0).map((_, i) =>
      (<React.Fragment key={i}>
        <UserChatBubble />
        <AssistantChatBubble />
      </React.Fragment>)
      )}
    </ScrollView>
  );
}

function UserChatBubble() {
  const { theme } = useTheme();
  return (
    <Button
      buttonStyle={{ justifyContent: 'flex-end', paddingHorizontal: CHAT_GLOBAL_HORIZONTAL_PADDING }}>
      <Button
        radius={11 + 10} // lineheight / 2 + paddingVertical
        buttonStyle={{
          backgroundColor: theme.colors.background,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
        containerStyle={{ maxWidth: '80%' }}
      >
        <Text style={{
          fontSize: 16,
          color: theme.colors.black,
          lineHeight: 22,
        }}>你你好你好你好你好你好你好好你好你你好你好你好你好你好你好好你好</Text>
      </Button>

    </Button>
  );
}

function AssistantChatBubble() {
  const { theme } = useTheme();
  return (
    <Button
      buttonStyle={{ justifyContent: 'flex-start', paddingHorizontal: CHAT_GLOBAL_HORIZONTAL_PADDING }}>

    </Button>
  );
}