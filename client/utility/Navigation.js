import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../pages/RegisterScreen';
import LoginScreen from '../pages/LoginScreen';
import DrawerMenu from './Drawer';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTransparent: true,
          headerBackground: () => null,
          headerTitleStyle: {
            color: 'grey',
            fontSize: 14,
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTransparent: true,
          headerBackground: () => null,
          headerTitleStyle: {
            color: 'grey',
            fontSize: 14,
          },
        }}
      />
      <Stack.Screen
        name="HomePage"
        component={DrawerMenu}
        options={{
          headerTitle: '',
          headerLeft: null,
          headerTransparent: true,
          headerBackground: () => null,
          headerTitleStyle: {
            color: 'grey',
            fontSize: 14,
          },
        }}  
      />
    </Stack.Navigator>
  );
}

export default Navigation;