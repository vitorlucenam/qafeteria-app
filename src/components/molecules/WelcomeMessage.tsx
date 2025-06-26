import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../../types/auth';

export interface WelcomeMessageProps {
  user: User;
  showLastLogin?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  user,
  showLastLogin = false,
  testID = 'welcome-message',
  accessibilityLabel,
}) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const greeting = getGreeting();
  const displayName = user.name || user.email.split('@')[0];
  const welcomeText = `${greeting}, ${displayName}!`;

  return (
    <View 
      style={styles.container}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `Mensagem de boas-vindas para ${displayName}`}
      accessible={true}
    >
      <Text 
        style={styles.greeting}
        testID={`${testID}-greeting`}
        accessibilityRole="header"
      >
        {welcomeText}
      </Text>
      
      <Text 
        style={styles.subtitle}
        testID={`${testID}-subtitle`}
      >
        Bem-vindo de volta!
      </Text>

      {showLastLogin && user.lastLoginAt && (
        <Text 
          style={styles.lastLogin}
          testID={`${testID}-last-login`}
          accessibilityLabel={`Último acesso em ${formatDate(user.lastLoginAt)}`}
        >
          Último acesso: {formatDate(user.lastLoginAt)}
        </Text>
      )}

      {user.role === 'admin' && (
        <View 
          style={styles.badge}
          testID={`${testID}-admin-badge`}
          accessibilityLabel="Usuário administrador"
        >
          <Text style={styles.badgeText}>Admin</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  lastLogin: {
    fontSize: 14,
    color: '#95a5a6',
    fontStyle: 'italic',
    marginTop: 8,
  },
  badge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});