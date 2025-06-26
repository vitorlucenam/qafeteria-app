import React, { useState, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { LoginForm } from '../components/molecules/LoginForm';
import { Toast } from '../components/atoms/Toast';
import { LoginScreenProps } from '../types/navigation';
import { LoginCredentials, User } from '../types/auth';
import { authConfig } from '../config/auth';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [loginAttempts, setLoginAttempts] = useState(0);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  const validateCredentials = (credentials: LoginCredentials): boolean => {
    return (
      credentials.email === authConfig.email &&
      credentials.password === authConfig.password
    );
  };

  const createMockUser = (): User => {
    return {
      id: '1',
      email: authConfig.email,
      name: 'Vitor',
      role: 'user',
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
  };

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    if (loginAttempts >= authConfig.maxLoginAttempts) {
      showToast('Muitas tentativas de login. Tente novamente mais tarde.', 'error');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!credentials.email || !credentials.password) {
        showToast('Por favor, preencha todos os campos', 'warning');
        setLoginAttempts(prev => prev + 1);
        return;
      }

      if (!validateCredentials(credentials)) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= authConfig.maxLoginAttempts) {
          showToast('Muitas tentativas incorretas. Conta bloqueada temporariamente.', 'error');
        } else {
          showToast(
            `Credenciais incorretas. Tentativa ${newAttempts} de ${authConfig.maxLoginAttempts}`,
            'error'
          );
        }
        return;
      }

      // Success - navigate to Home
      const user = createMockUser();
      showToast('Login realizado com sucesso!', 'success');
      
      // Small delay to show success message before navigation
      setTimeout(() => {
        navigation.replace('Home');
      }, 1000);

    } catch (error) {
      showToast('Erro interno. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  }, [loginAttempts, navigation, showToast]);

  const isLoginDisabled = loginAttempts >= authConfig.maxLoginAttempts;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      testID="login-screen"
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title} testID="login-title">
            QAfeteria
          </Text>
          <Text style={styles.subtitle} testID="login-subtitle">
            Faça login para continuar
          </Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm
            onSubmit={handleLogin}
            loading={loading || isLoginDisabled}
            testID="login-form"
          />
          
          {isLoginDisabled && (
            <Text style={styles.blockedText} testID="login-blocked-message">
              Conta temporariamente bloqueada por excesso de tentativas incorretas.
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.credentialsHint} testID="login-credentials-hint">
            Dica: vitor@app.com / vitor123
          </Text>
        </View>
      </ScrollView>

      <Toast
        message={toastMessage}
        type={toastType}
        visible={toastVisible}
        onHide={hideToast}
        position="top"
        testID="login-toast"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  blockedText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  credentialsHint: {
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
});