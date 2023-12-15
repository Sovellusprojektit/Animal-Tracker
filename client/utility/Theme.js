import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const lightModeColors = {
    backgroundColor: 'white',
    textColor: 'black',
  };

  const darkModeColors = {
    backgroundColor: 'gray',
    textColor: 'white',
  };

  const themeColors = isDarkMode ? darkModeColors : lightModeColors;

  const backgroundImages = {
    backgroundImage: isDarkMode
      ? require('../utility/images/dark_theme_bg.jpg')
      : require('../utility/images/white_theme_bg.jpg'),
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, themeColors, backgroundImages }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};