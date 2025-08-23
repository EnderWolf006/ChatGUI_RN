import { useCallback, useState } from 'react';

export default function useScrollPosition({
  topThreshold = 2,
  bottomThreshold = 2
}) {
  const [isAtTop, setIsAtTop] = useState(true); // 初始时在顶部
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = useCallback((nativeEvent: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    const isTop = contentOffset.y <= topThreshold;
    setIsAtTop(isTop);

    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - bottomThreshold;
    setIsAtBottom(isBottom);
  }, [topThreshold, bottomThreshold]);

  return {
    isAtTop,
    isAtBottom,
    checkScrollPosition,
  };
}
