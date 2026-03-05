# Crypto Exchange React Native App

This is a simple crypto exchange app built with React Native and Expo.

## Features
- View list of top cryptocurrencies with loading indicator
- Detailed crypto info with 7-day price chart
- Buy crypto and view portfolio with persistent storage
- Professional UI with bottom tab navigation and icons
- Crypto news feed
- Responsive design with shadows and modern styling

## Installation

1. Install dependencies:
   ```
   npx expo install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context axios react-native-chart-kit @expo/vector-icons react-native-svg @react-native-async-storage/async-storage
   ```

2. Start the app:
   ```
   npx expo start
   ```

## API
Uses CoinGecko API for cryptocurrency data.

## Note
Buying adds 1 unit to portfolio stored in AsyncStorage. Portfolio persists across app restarts.

**If the app shows a white screen, it may be due to missing packages. The code has mock data commented in to test without dependencies. Install packages and uncomment the real code.**