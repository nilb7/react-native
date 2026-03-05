import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = {
    isDarkMode,
    colors: {
      // Background colors
      background: isDarkMode ? '#121212' : '#f8f9fa',
      card: isDarkMode ? '#1e1e1e' : '#fff',
      header: isDarkMode ? '#1e1e1e' : '#fff',

      // Text colors
      text: isDarkMode ? '#ffffff' : '#333',
      textSecondary: isDarkMode ? '#cccccc' : '#666',
      textMuted: isDarkMode ? '#888888' : '#999',

      // Border colors
      border: isDarkMode ? '#333333' : '#e9ecef',

      // Accent colors
      primary: '#ff6b35',
      positive: '#28a745',
      negative: '#dc3545',

      // Tab bar colors
      tabBarActive: '#ff6b35',
      tabBarInactive: isDarkMode ? '#888888' : '#6c757d',
    },
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};