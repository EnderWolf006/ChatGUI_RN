import { createTheme } from "@rneui/themed";
import { Platform, TouchableNativeFeedback } from 'react-native';
import React from 'react';

// 自定义 Touchable：通过设置 delayPressIn 延迟展示水波/高亮，这样在 ScrollView 中开始滚动（手指移动）时
// 原本会立即出现的水波不会触发；正常点击（无明显滚动）仍然会在短暂延迟后出现水波反馈。
// 说明：纯粹在滚动手势中，RN 会在成为滚动手势后取消触摸，因此延迟期间被取消便不会显示反馈。
// 该方案最小侵入，只修改主题文件；若需更精细（例如动态监听父级 onScroll），可以后续扩展。
const AndroidTouchable = (props: any) => {
  // 使用 createElement 以避免在 .ts 文件中写 JSX
  return React.createElement(TouchableNativeFeedback as any, {
    delayPressIn: 90, // 延迟水波出现，减轻滚动手势误触反馈
    ...props,
  });
};

export const themeConfig = createTheme({
  lightColors: {
    primary: "#2563eb",
    background: '#F3F3F3',
  },
  darkColors: {
    primary: "#3b82f6",
    background: '#262626',
  },
  components: {
    Text: (props, theme) => ({
      style: {
        color: theme.colors.black,
        fontSize: 16,
      },
    }),
    Button: (props, theme) => {
      const radius = (props?.radius as any) ?? 0;
      return {
        radius,
        color: 'rgba(0, 0, 0, 0)',
        titleStyle: { color: theme.colors.black },
        // 确保按钮本身也有圆角（部分平台需要）
        buttonStyle: [
          {
            borderRadius: radius,
            paddingVertical: 14,
          },
          props?.buttonStyle as any],
        ...(Platform.OS === 'android'
          ? {
            // @ts-ignore 自定义触摸组件（加入 delayPressIn 降低滚动时误触反馈）
            TouchableComponent: AndroidTouchable as any,
            background: TouchableNativeFeedback.Ripple('rgba(128,128,128,0.3)', false),
            // 用 containerStyle 裁剪 ripple，保持与 radius 一致
            containerStyle: [
              { borderRadius: radius, overflow: 'hidden' },
              props?.containerStyle as any,
            ],
          }
          : {
            // iOS 使用默认（Opacity）反馈逻辑
            containerStyle: [props?.containerStyle as any],
          }),
      };
    },
    Icon: (props, theme) => ({
      color: theme.colors.black,
      size: 24,
    }),
    Input: (props, theme) => ({
      inputContainerStyle: {
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        margin: 0,
      },
      inputStyle: {
        color: theme.colors.black,
        fontSize: 16,
      },
    })
  }
});