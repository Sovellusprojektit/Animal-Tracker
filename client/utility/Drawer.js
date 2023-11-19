import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomePage from '../pages/HomePage';
import Settings from '../pages/Settings';
import { useTheme } from '../utility/Theme';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const { isDarkMode, themeColors } = useTheme();

  const drawerBackgroundColor = {
    backgroundColor: themeColors.backgroundColor,
  };

  return (
    <DrawerContentScrollView style={drawerBackgroundColor}>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
        labelStyle={{ color: themeColors.textColor }}
      />
      <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
        labelStyle={{ color: themeColors.textColor }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerMenu() {
  const { themeColors } = useTheme();

  const drawerStyle = {
    backgroundColor: themeColors.backgroundColor,
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: themeColors.backgroundColor,
    },
    headerTintColor: themeColors.textColor,
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={CustomDrawerContent}
      drawerStyle={drawerStyle}
      drawerLabelStyle={{
        color: themeColors.textColor,
      }}
      screenOptions={screenOptions}
    >
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
