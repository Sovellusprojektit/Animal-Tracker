import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Map from '../utility/Map';
import Settings from '../pages/Settings';
import AccountInfo from '../pages/AccountInfo';
import History from '../pages/History';
import { useTheme } from '../utility/Theme';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const { themeColors } = useTheme();

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
      <DrawerItem
        label="History"
        onPress={() => navigation.navigate('History')}
        labelStyle={{ color: themeColors.textColor }}
      />
      <DrawerItem
        label="Account Info"
        onPress={() => navigation.navigate('Account Info')}
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
      <Drawer.Screen name="Home" component={Map} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Account Info" component={AccountInfo} />
    </Drawer.Navigator>
  );
}
