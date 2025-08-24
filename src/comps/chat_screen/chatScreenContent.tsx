import { Button, Text, useTheme } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MarkdownRenderer } from "../markdown/markdownRenderer";

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
      buttonStyle={{ justifyContent: 'flex-end', paddingHorizontal: CHAT_GLOBAL_HORIZONTAL_PADDING, paddingVertical: 0 }}>
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

  const markdownExample = `# 这是一个Markdown示例

这里是一段普通文本，包含**加粗文字**和*斜体文字*。

## 代码示例

这是一个内联代码：\`console.log('Hello World')\`

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Nice to meet you, \${name}\`;
}

greet('世界');
\`\`\`

## 其他功能

> 这是一个引用块
> 可以包含多行内容

### 列表示例

- 项目1
- 项目2
- 项目3

1. 有序列表项1
2. 有序列表项2
3. 有序列表项3

[这是一个链接](https://example.com)

---

**表格示例：**

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |`;

  return (
    <View
      style={{ paddingHorizontal: CHAT_GLOBAL_HORIZONTAL_PADDING, paddingVertical: 0 }}
    >
      <MarkdownRenderer>{markdownExample}</MarkdownRenderer>
    </View>
  );
}