import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';
import Footer from '../components/Footer';
// import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCryptos();
    getCurrentUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCurrentUser();
    }, [])
  );

  const getCurrentUser = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) setCurrentUser(user);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCryptos = async () => {
    try {
      // const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1');
      // setCryptos(response.data);
      // Mock data for testing
      setCryptos([
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'btc',
          image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
          current_price: 50000,
          price_change_percentage_24h: 2.5,
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'eth',
          image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
          current_price: 3000,
          price_change_percentage_24h: -1.2,
        },
        {
          id: 'binancecoin',
          name: 'Binance Coin',
          symbol: 'bnb',
          image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
          current_price: 250,
          price_change_percentage_24h: 1.8,
        },
        {
          id: 'cardano',
          name: 'Cardano',
          symbol: 'ada',
          image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
          current_price: 0.5,
          price_change_percentage_24h: -0.5,
        },
        {
          id: 'solana',
          name: 'Solana',
          symbol: 'sol',
          image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
          current_price: 100,
          price_change_percentage_24h: 3.2,
        },
        {
          id: 'polkadot',
          name: 'Polkadot',
          symbol: 'dot',
          image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
          current_price: 8,
          price_change_percentage_24h: -2.1,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles(colors).item} onPress={() => navigation.navigate('CryptoDetail', { crypto: item })}>
      <Image source={{ uri: item.image }} style={styles(colors).image} />
      <View style={styles(colors).info}>
        <Text style={styles(colors).name}>{item.name}</Text>
        <Text style={styles(colors).symbol}>{item.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles(colors).price}>
        <Text style={styles(colors).currentPrice}>${item.current_price.toFixed(2)}</Text>
        <Text style={[styles(colors).change, item.price_change_percentage_24h > 0 ? styles(colors).positive : styles(colors).negative]}>
          {item.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).header}>
        <BurgerMenu navigation={navigation} />
        <View style={styles(colors).headerContent}>
          <Text style={styles(colors).logo}>₿</Text>
          <Text style={styles(colors).title}>Crypto Exchange</Text>
        </View>
        <View style={styles(colors).headerRight}>  
          {currentUser ? (
            <TouchableOpacity onPress={async () => { await AsyncStorage.removeItem('portfolio_' + currentUser); await AsyncStorage.removeItem('currentUser'); setCurrentUser(null); }} style={styles(colors).authButton}>
              <Text style={styles(colors).authButtonText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles(colors).authButtons}>
              <TouchableOpacity onPress={() => navigation.navigate('Auth', { mode: 'login' })} style={styles(colors).authButton}>
                <Text style={styles(colors).authButtonText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Auth', { mode: 'signup' })} style={styles(colors).authButton}>
                <Text style={styles(colors).authButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
          <ThemeToggle />
        </View>
      </View>
      {currentUser && (
        <View style={styles(colors).welcomeContainer}>
          <Text style={styles(colors).welcomeText}>Welcome, {currentUser}!</Text>
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles(colors).loader} />
      ) : (
        <FlatList
          data={cryptos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Footer />
    </View>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    color: colors.primary,
    marginRight: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    backgroundColor: colors.card,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  symbol: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  price: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  change: {
    fontSize: 14,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButtons: {
    flexDirection: 'row',
  },
  authButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  welcomeContainer: {
    padding: 10,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
