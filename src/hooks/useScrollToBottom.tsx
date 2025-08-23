import { useCallback, useState } from 'react';

export interface UseScrollPositionOptions {
  topThreshold?: number;    // 距离顶部多少像素时认为是在顶部
  bottomThreshold?: number; // 距离底部多少像素时认为是在底部
}

export interface UseScrollPositionResult {
  isAtTop: boolean;
  isAtBottom: boolean;
  checkScrollPosition: (nativeEvent: any) => void;
}

export default function useScrollPosition({ 
  topThreshold = 20,
  bottomThreshold = 20 
}: UseScrollPositionOptions = {}): UseScrollPositionResult {
  const [isAtTop, setIsAtTop] = useState(true); // 初始时在顶部
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const checkScrollPosition = useCallback((nativeEvent: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    
    // 检测是否在顶部
    const isTop = contentOffset.y <= topThreshold;
    setIsAtTop(isTop);
    
    // 检测是否在底部
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - bottomThreshold;
    setIsAtBottom(isBottom);
  }, [topThreshold, bottomThreshold]);

  return {
    isAtTop,
    isAtBottom,
    checkScrollPosition,
  };
}
