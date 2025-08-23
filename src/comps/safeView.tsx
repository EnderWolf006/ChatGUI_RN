// SafeView.tsx
import useKeyboard from '@/hooks/useKeyboard';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type EdgeFlags = { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean };
type SafeViewProps = ViewProps & {
  edges?: EdgeFlags;
  bottomMode?: 'replace' | 'add'; // 默认 replace：键盘高度替换 inset.bottom
  /** 若你没有使用 React Navigation，可手动控制是否启用键盘逻辑 */
  active?: boolean;
};

export default function SafeView({
  style,
  children,
  edges,
  bottomMode = 'replace',
  active,
  ...rest
}: SafeViewProps) {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();               // 当前路由是否聚焦
  const drawerStatus = useDrawerStatus?.();       // 'open' | 'closed'
  const drawerOpen = drawerStatus === 'open';

  // 仅“聚焦且抽屉关闭”时启用键盘逻辑；否则当作 SafeAreaView
  const enabled = active ?? (isFocused && !drawerOpen);

  // 键盘 Hook（按需启用）
  const { progress, heightAV } = useKeyboard({ enabled });

  const useTop = edges?.top ?? true;
  const useBottom = edges?.bottom ?? true;
  const useLeft = edges?.left ?? true;
  const useRight = edges?.right ?? true;

  const paddingTop = useTop ? insets.top : 0;
  const paddingLeft = useLeft ? insets.left : 0;
  const paddingRight = useRight ? insets.right : 0;

  // 用 Animated.Value 追踪 inset.bottom（支持旋转/设备变化）
  const insetBottomAV = useRef(new Animated.Value(insets.bottom)).current;
  useEffect(() => {
    insetBottomAV.setValue(insets.bottom);
  }, [insets.bottom, insetBottomAV]);

  const one = useRef(new Animated.Value(1)).current;

  // replace: (1 - p) * inset.bottom + p * keyboardHeight
  const replacePB = Animated.add(
    Animated.multiply(Animated.subtract(one, progress), insetBottomAV),
    Animated.multiply(progress, heightAV)
  );

  // add: inset.bottom + p * keyboardHeight
  const addPB = Animated.add(insetBottomAV, Animated.multiply(progress, heightAV));

  // 未启用时 => 直接使用 inset.bottom（无动画）
  const paddingBottom = useBottom ? (enabled ? (bottomMode === 'replace' ? replacePB : addPB) : insets.bottom) : 0;

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop, paddingLeft, paddingRight, paddingBottom: paddingBottom as any },
        style,
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
