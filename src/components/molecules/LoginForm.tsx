import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputField } from '../atoms/InputField';
import { Button } from '../atoms/Button';
import { LoginCredentials } from '../../types/auth';

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  loading?: boolean;
  error?: string;
  testID?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  testID = 'login-form',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email é obrigatório';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email inválido';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password.trim()) {
      return 'Senha é obrigatória';
    }
    if (password.length < 6) {
      return 'Senha deve ter pelo menos 6 caracteres';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(text) }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(text) }));
    }
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    setErrors(prev => ({ ...prev, password: validatePassword(password) }));
  };

  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    
    if (validateForm()) {
      onSubmit({ email: email.trim(), password });
    }
  };

  const hasEmailError = !!(errors.email && touched.email);
  const hasPasswordError = !!(errors.password && touched.password);

  return (
    <View style={styles.container} testID={testID}>
      <InputField
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        onBlur={handleEmailBlur}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={hasEmailError ? errors.email : undefined}
        hasError={hasEmailError}
        accessibilityLabel="Campo de email"
        testID={`${testID}-email-input`}
      />
      
      <InputField
        label="Senha"
        value={password}
        onChangeText={handlePasswordChange}
        onBlur={handlePasswordBlur}
        placeholder="Digite sua senha"
        secureTextEntry
        error={hasPasswordError ? errors.password : undefined}
        hasError={hasPasswordError}
        accessibilityLabel="Campo de senha"
        testID={`${testID}-password-input`}
      />

      <Button
        title="Entrar"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        fullWidth
        accessibilityLabel="Botão de login"
        testID={`${testID}-submit-button`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});