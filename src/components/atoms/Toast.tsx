import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  visible: boolean;
  duration?: number;
  onHide?: () => void;
  position?: 'top' | 'bottom';
  accessibilityLabel?: string;
  testID?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  visible,
  duration = 3000,
  onHide,
  position = 'top',
  accessibilityLabel,
  testID,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [visible, duration]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  if (!visible && fadeAnim._value === 0) {
    return null;
  }

  const containerStyle = [
    styles.container,
    styles[position],
    styles[`container${type.charAt(0).toUpperCase()}${type.slice(1)}`],
  ];

  const textStyle = [
    styles.text,
    styles[`text${type.charAt(0).toUpperCase()}${type.slice(1)}`],
  ];

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      accessibilityLabel={accessibilityLabel || message}
      accessibilityRole="alert"
      testID={testID}
      accessible={true}
      accessibilityLiveRegion="polite"
    >
      <Text style={textStyle} testID={`${testID}-text`}>
        {message}
      </Text>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
    maxWidth: width - 32,
  },
  top: {
    top: 50,
  },
  bottom: {
    bottom: 50,
  },
  containerSuccess: {
    backgroundColor: '#27ae60',
  },
  containerError: {
    backgroundColor: '#e74c3c',
  },
  containerWarning: {
    backgroundColor: '#f39c12',
  },
  containerInfo: {
    backgroundColor: '#3498db',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  textSuccess: {
    color: '#fff',
  },
  textError: {
    color: '#fff',
  },
  textWarning: {
    color: '#fff',
  },
  textInfo: {
    color: '#fff',
  },
});