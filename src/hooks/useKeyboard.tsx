// @/hooks/useKeyboard.ts
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Keyboard, KeyboardEvent, Platform } from 'react-native';

export type UseKeyboardResult = {
  shown: boolean;
  height: number;               // 键盘高度（数值）
  heightAV: Animated.Value;     // 键盘高度（不做动画，只 setValue）
  progress: Animated.Value;     // 0→1 的唯一动画进度
  duration: number;             // 最近一次动画时长
  dismiss: () => void;
};

const ANDROID_DURATION = 220;
const IOS_DURATION = 250;

export default function useKeyboard({ enabled = true }: { enabled?: boolean } = {}): UseKeyboardResult {
  const [shown, setShown] = useState(false);
  const [height, setHeight] = useState(0);
  const [duration, setDuration] = useState(Platform.OS === 'android' ? ANDROID_DURATION : IOS_DURATION);

  const progress = useRef(new Animated.Value(0)).current;
  const heightAV = useRef(new Animated.Value(0)).current;

  const lastRef = useRef({ h: 0, t: 0 });

  const animateTo = (to: 0 | 1, d: number) => {
    setDuration(d);
    Animated.timing(progress, {
      toValue: to,
      duration: d,
      easing: Platform.OS === 'ios' ? undefined : Easing.inOut(Easing.ease),
      useNativeDriver: false, // layout
    }).start();
  };

  useEffect(() => {
    if (!enabled) {
      // 禁用：复位一切并不监听
      setShown(false);
      setHeight(0);
      heightAV.setValue(0);
      progress.stopAnimation();
      progress.setValue(0);
      return;
    }

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: KeyboardEvent) => {
      const h = e?.endCoordinates?.height ?? 0;
      const d =
        typeof e?.duration === 'number'
          ? e.duration
          : Platform.OS === 'android'
          ? ANDROID_DURATION
          : IOS_DURATION;

      const now = Date.now();
      if (lastRef.current.h === h && now - lastRef.current.t < 50) return; // 防抖
      lastRef.current = { h, t: now };

      setShown(true);
      setHeight(h);
      heightAV.setValue(h);   // 高度即时更新，不动画
      animateTo(1, d);        // 唯一动画：进度
    };

    const onHide = (e?: KeyboardEvent) => {
      const d =
        typeof e?.duration === 'number'
          ? e.duration
          : Platform.OS === 'android'
          ? ANDROID_DURATION
          : IOS_DURATION;

      const now = Date.now();
      if (lastRef.current.h === 0 && now - lastRef.current.t < 50) return; // 防抖
      lastRef.current = { h: 0, t: now };

      setShown(false);
      setHeight(0);
      heightAV.setValue(0);
      animateTo(0, d);
    };

    const s1 = Keyboard.addListener(showEvent, onShow);
    const s2 = Keyboard.addListener(hideEvent, onHide);
    return () => {
      s1.remove();
      s2.remove();
    };
  }, [enabled]);

  const dismiss = () => Keyboard.dismiss();

  return { shown, height, heightAV, progress, duration, dismiss };
}
