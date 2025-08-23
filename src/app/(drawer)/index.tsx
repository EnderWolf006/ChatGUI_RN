import { ChatScreenContent } from "@/comps/chat_screen/chatScreenContent";
import { ChatScreenFooter } from "@/comps/chat_screen/chatScreenFooter";
import { ChatScreenHeader } from "@/comps/chat_screen/chatScreenHeader";
import SafeView from "@/comps/safeView";
import useScrollPosition from "@/hooks/useScrollPosition";
import { toRgba } from "@/utils/colorUtils";
import { useTheme } from "@rneui/themed";
import { useEffect, useRef } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function Index() {
  const { theme } = useTheme();
  const ref = useRef<ScrollView>(null);
  const { isAtTop, isAtBottom, checkScrollPosition } = useScrollPosition({});


  // Divider color animation
  const topColorProgress = useSharedValue(0);
  const bottomColorProgress = useSharedValue(0);

  useEffect(() => {
    topColorProgress.value = withTiming(isAtTop ? 0 : 1, { duration: 300 });
  }, [isAtTop]);

  useEffect(() => {
    bottomColorProgress.value = withTiming(isAtBottom ? 0 : 1, { duration: 300 });
  }, [isAtBottom]);

  const greyColor = theme.colors.grey0;
  const transparentColor = toRgba(greyColor, 0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderTopColor: interpolateColor(topColorProgress.value, [0, 1], [transparentColor, greyColor]),
      borderBottomColor: interpolateColor(bottomColorProgress.value, [0, 1], [transparentColor, greyColor]),
    };
  }, [theme.colors.grey1]);

  return (
    <SafeView style={{ flex: 1, backgroundColor: theme.colors.white }}>

      <ChatScreenHeader />

      <Animated.View style={[{
        flex: 1,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
      }, animatedStyle]}>
        <ChatScreenContent onScroll={checkScrollPosition} />
      </Animated.View>

      <ChatScreenFooter />

    </SafeView >
  );
}