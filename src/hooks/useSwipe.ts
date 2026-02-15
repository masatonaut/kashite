"use client";

import { useRef, useState, useCallback, type TouchEvent, type MouseEvent } from "react";

interface UseSwipeOptions {
  threshold?: number;
  velocityThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeState {
  offsetX: number;
  isSwiping: boolean;
  isRevealed: boolean;
}

export function useSwipe({
  threshold = 80,
  velocityThreshold = 0.5,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeOptions = {}) {
  const [state, setState] = useState<SwipeState>({
    offsetX: 0,
    isSwiping: false,
    isRevealed: false,
  });

  const startX = useRef(0);
  const startTime = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent | MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    startTime.current = Date.now();
    currentX.current = clientX;
    setState((prev) => ({ ...prev, isSwiping: true }));
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!state.isSwiping) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    currentX.current = clientX;
    const diff = clientX - startX.current;

    // Only allow left swipe (negative values)
    const offsetX = Math.min(0, diff);

    setState((prev) => ({
      ...prev,
      offsetX,
      isRevealed: Math.abs(offsetX) >= threshold,
    }));
  }, [state.isSwiping, threshold]);

  const handleTouchEnd = useCallback(() => {
    if (!state.isSwiping) return;

    const diff = currentX.current - startX.current;
    const duration = Date.now() - startTime.current;
    const velocity = Math.abs(diff) / duration;

    const shouldTrigger =
      Math.abs(diff) >= threshold || velocity >= velocityThreshold;

    if (shouldTrigger && diff < 0) {
      // Left swipe confirmed
      onSwipeLeft?.();
    } else if (shouldTrigger && diff > 0) {
      // Right swipe confirmed
      onSwipeRight?.();
    }

    // Reset to initial state with spring animation
    setState({
      offsetX: 0,
      isSwiping: false,
      isRevealed: false,
    });
  }, [state.isSwiping, threshold, velocityThreshold, onSwipeLeft, onSwipeRight]);

  const reset = useCallback(() => {
    setState({
      offsetX: 0,
      isSwiping: false,
      isRevealed: false,
    });
  }, []);

  return {
    offsetX: state.offsetX,
    isSwiping: state.isSwiping,
    isRevealed: state.isRevealed,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleTouchStart,
      onMouseMove: handleTouchMove,
      onMouseUp: handleTouchEnd,
      onMouseLeave: handleTouchEnd,
    },
    reset,
  };
}
