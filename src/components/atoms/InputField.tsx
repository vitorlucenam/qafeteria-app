import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

export interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hasError?: boolean;
  secureTextEntry?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  hasError = false,
  secureTextEntry = false,
  accessibilityLabel,
  testID,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
}) => {
  const inputStyle = [
    styles.input,
    hasError || error ? styles.inputError : null,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text 
          style={styles.label}
          testID={`${testID}-label`}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        accessibilityLabel={accessibilityLabel || label || placeholder}
        testID={testID}
        accessible={true}
        accessibilityHint={error ? `Erro: ${error}` : undefined}
      />
      {error && (
        <Text 
          style={styles.errorText}
          testID={`${testID}-error`}
          accessibilityLabel={`Erro: ${error}`}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 48,
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
});