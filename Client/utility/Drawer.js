import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button } from 'react-native';
import HomePage from '../pages/HomePage';
import About from '../pages/About';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login')
  };
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem 
        label="About"
        onPress={() => navigation.navigate('About')}
      />
      <Button title="Log out" onPress={handleLogout} color={"black"}/>

    </DrawerContentScrollView>
  );
}

export default function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Home" component={HomePage}/>
      <Drawer.Screen name="About" component={About} />
      
    </Drawer.Navigator>
  );
}
