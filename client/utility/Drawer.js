import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomePage from '../pages/HomePage';
import Settings from '../pages/Settings';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
        <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
    />
    </DrawerContentScrollView>
  );
}

export default function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
    <Drawer.Screen name="Home" component={HomePage}/>
    <Drawer.Screen name="Settings" component={Settings}/>
      
    </Drawer.Navigator>
  );
}