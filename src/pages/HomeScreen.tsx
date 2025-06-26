import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { WelcomeMessage } from '../components/molecules/WelcomeMessage';
import { Button } from '../components/atoms/Button';
import { Toast } from '../components/atoms/Toast';
import { HomeScreenProps } from '../types/navigation';
import { User } from '../types/auth';
import { authConfig } from '../config/auth';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Mock user data - in a real app, this would come from context/state management
  const mockUser: User = {
    id: '1',
    email: authConfig.email,
    name: 'Vitor',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
  };

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setLogoutLoading(true);
            
            try {
              // Simulate logout process
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              showToast('Logout realizado com sucesso!', 'success');
              
              // Navigate back to Login after showing success message
              setTimeout(() => {
                navigation.replace('Login');
              }, 1500);
              
            } catch (error) {
              showToast('Erro ao fazer logout. Tente novamente.', 'error');
            } finally {
              setLogoutLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, [navigation, showToast]);

  const handleQuickAction = useCallback((action: string) => {
    showToast(`Ação "${action}" será implementada em breve!`, 'info');
  }, [showToast]);

  return (
    <View style={styles.container} testID="home-screen">
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <WelcomeMessage
            user={mockUser}
            showLastLogin={true}
            testID="welcome-message"
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle} testID="quick-actions-title">
              Ações Rápidas
            </Text>
            
            <View style={styles.actionButtons}>
              <Button
                title="Ver Perfil"
                onPress={() => handleQuickAction('Ver Perfil')}
                variant="secondary"
                size="medium"
                testID="profile-button"
                accessibilityLabel="Botão para ver perfil"
              />
              
              <Button
                title="Configurações"
                onPress={() => handleQuickAction('Configurações')}
                variant="secondary"
                size="medium"
                testID="settings-button"
                accessibilityLabel="Botão para acessar configurações"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle} testID="account-section-title">
              Conta
            </Text>
            
            <View style={styles.accountInfo}>
              <Text style={styles.accountLabel}>Email:</Text>
              <Text style={styles.accountValue} testID="user-email">
                {mockUser.email}
              </Text>
              
              <Text style={styles.accountLabel}>Tipo:</Text>
              <Text style={styles.accountValue} testID="user-role">
                {mockUser.role === 'admin' ? 'Administrador' : 'Usuário'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Sair"
          onPress={handleLogout}
          variant="danger"
          size="large"
          loading={logoutLoading}
          disabled={logoutLoading}
          fullWidth
          testID="logout-button"
          accessibilityLabel="Botão de logout"
        />
      </View>

      <Toast
        message={toastMessage}
        type={toastType}
        visible={toastVisible}
        onHide={hideToast}
        position="top"
        testID="home-toast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Space for footer button
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  accountInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  accountLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
    fontWeight: '500',
  },
  accountValue: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
});