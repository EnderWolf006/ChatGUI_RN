// SafeView.tsx
import useKeyboard from '@/hooks/useKeyboard';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type EdgeFlags = { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean };
type SafeViewProps = ViewProps & {
  edges?: EdgeFlags;
  bottomMode?: 'replace' | 'add'; 
  active?: boolean;
};

export default function SafeView({
  style,
  children,
  edges,
  bottomMode = Platform.OS == "android" ? 'add' : 'replace',
  active,
  ...rest
}: SafeViewProps) {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const drawerStatus = useDrawerStatus?.();
  const drawerOpen = drawerStatus === 'open';

  const enabled = active ?? (isFocused && !drawerOpen);

  const { progress, heightAV } = useKeyboard({ enabled });

  const useTop = edges?.top ?? true;
  const useBottom = edges?.bottom ?? true;
  const useLeft = edges?.left ?? true;
  const useRight = edges?.right ?? true;

  const paddingTop = useTop ? insets.top : 0;
  const paddingLeft = useLeft ? insets.left : 0;
  const paddingRight = useRight ? insets.right : 0;

  const insetBottomAV = useRef(new Animated.Value(insets.bottom)).current;
  useEffect(() => {
    insetBottomAV.setValue(insets.bottom);
  }, [insets.bottom, insetBottomAV]);

  const one = useRef(new Animated.Value(1)).current;

  const replacePB = Animated.add(
    Animated.multiply(Animated.subtract(one, progress), insetBottomAV),
    Animated.multiply(progress, heightAV)
  );

  const addPB = Animated.add(insetBottomAV, Animated.multiply(progress, heightAV));

  let paddingBottom: number | Animated.AnimatedNode;
  if (!useBottom) {
    paddingBottom = 0;
  } else if (!enabled) {
    paddingBottom = insets.bottom;
  } else if (bottomMode === 'replace') {
    paddingBottom = replacePB;
  } else {
    paddingBottom = addPB;
  }

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
