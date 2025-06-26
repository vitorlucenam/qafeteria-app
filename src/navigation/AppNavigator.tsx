import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../pages/LoginScreen';
import { HomeScreen } from '../pages/HomeScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f5f6fa' },
          gestureEnabled: false, // Disable swipe back gesture
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerShown: false,
            // Prevent going back to login screen
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};