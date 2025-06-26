import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  accessibilityLabel,
  testID,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    styles[`button${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    fullWidth && styles.buttonFullWidth,
    isDisabled && styles.buttonDisabled,
  ];

  const textStyle = [
    styles.text,
    styles[`text${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    styles[`text${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    isDisabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      testID={testID}
      accessible={true}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#fff' : '#007AFF'}
            style={styles.loader}
            testID={`${testID}-loader`}
          />
        )}
        <Text style={textStyle}>
          {loading ? 'Carregando...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonDanger: {
    backgroundColor: '#e74c3c',
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginRight: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: '#007AFF',
  },
  textDanger: {
    color: '#fff',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textDisabled: {
    opacity: 0.7,
  },
});