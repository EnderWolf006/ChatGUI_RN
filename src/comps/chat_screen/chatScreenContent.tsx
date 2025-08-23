import { Text } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

interface ChatScreenContentProps {
  ref?: React.Ref<ScrollView>;
  onScroll?: (nativeEvent: any) => void;
}

export function ChatScreenContent({ ref, onScroll }: ChatScreenContentProps) {
  console.log('ChatScreenContent');

  return (
    <ScrollView
      ref={ref}
      style={{ flex: 1 }}
      onScroll={onScroll ? (event) => onScroll(event.nativeEvent) : undefined}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      {new Array(101).fill(0).map((_, i) => <Text key={i}>{i}</Text>)}
    </ScrollView>
  );
}