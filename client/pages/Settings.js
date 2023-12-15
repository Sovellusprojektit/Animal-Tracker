import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import lightBackgroundImage from '../utility/images/white_theme_bg.jpg';
import darkBackgroundImage from '../utility/images/dark_theme_bg.jpg';
import { useTheme } from '../utility/Theme';
import { deleteAccessToken } from '../utility/Auth';
import { CommonActions } from '@react-navigation/native';

const SettingsPage = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode, themeColors } = useTheme();

  const getButtonStyle = () => {
    return {
      backgroundColor: isDarkMode ? 'gray' : themeColors.backgroundColor,
    };
  };

  const handleLogout = async () => {
    await deleteAccessToken(); 
    console.log('Navigation to Login screen');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const getButtonTextStyle = () => {
    return {
      fontSize: 16,
      color: themeColors.textColor,
    };
  };

  const getPageStyle = () => {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'gray' : themeColors.backgroundColor,
    };
  };

  return (
    <ImageBackground source={isDarkMode ? darkBackgroundImage : lightBackgroundImage} style={getPageStyle()}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.darkModeToggle, getButtonStyle()]}
          onPress={toggleDarkMode}
        >
          <Text style={[styles.darkModeToggleText, getButtonTextStyle()]}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.goBackButton, getButtonStyle()]}
        >
          <Text style={[styles.goBackButtonText, getButtonTextStyle()]}
            onPress={() => navigation.navigate('Home')}
          >
            Go back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.logoutButton, getButtonStyle()]}
        >
          <Text style={[styles.goBackButtonText, getButtonTextStyle()]}
            onPress={handleLogout}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  darkModeToggle: {
    marginTop: 100,
    padding: 10,
    borderRadius: 8,
  },
  darkModeToggleText: {
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  goBackButtonText: {
    fontSize: 16,
  },
  ChangePetToggle: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  changePetNameButtonText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 340,
    padding: 10,
    borderRadius: 8,
  },
});

export default SettingsPage;
