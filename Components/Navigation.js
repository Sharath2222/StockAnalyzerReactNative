// Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Registration from './Registration';
import Login from './Login';
import { AuthProvider } from './AuthContext';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Registration">
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default Navigation;
