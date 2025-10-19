// components/ui/swipe-gesture.tsx
import React, { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

const SWIPE_THRESHOLD = 50;

interface SwipeGestureProps {
  onSwipeRight: () => void;
  onSwipeLeft?: () => void;
  children: React.ReactNode;
  enabled?: boolean;
}

export const SwipeGesture: React.FC<SwipeGestureProps> = ({
  onSwipeRight,
  onSwipeLeft,
  children,
  enabled = true,
}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enabled,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Nur erkennen wenn horizontale Bewegung dominierend ist
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!enabled) return;

        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe von links nach rechts - zurück
          onSwipeRight();
        } else if (gestureState.dx < -SWIPE_THRESHOLD && onSwipeLeft) {
          // Swipe von rechts nach links - vorwärts
          onSwipeLeft();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
