import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import lightBackgroundImage from '../utility/images/white_theme_bg.jpg';
import darkBackgroundImage from '../utility/images/dark_theme_bg.jpg';
import { useTheme } from '../utility/Theme';

const SettingsPage = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode, themeColors } = useTheme();

  const getButtonStyle = () => {
    return {
      backgroundColor: isDarkMode ? 'gray' : themeColors.backgroundColor,
    };
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
          style={[styles.ChangePetToggle, getButtonStyle()]}
        >
          <Text style={[styles.changePetNameButtonText, getButtonTextStyle()]}
            //onPress={() => 
          >
            Change pet name
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  darkModeToggle: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  darkModeToggleText: {
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 550,
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
});

export default SettingsPage;
