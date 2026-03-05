import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';
import LocationMenu from '../components/LocationMenu';
import Footer from '../components/Footer';

const MarketOverviewScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [globalData, setGlobalData] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const [globalResponse, trendingResponse] = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/global'),
        axios.get('https://api.coingecko.com/api/v3/search/trending')
      ]);

      setGlobalData(globalResponse.data.data);
      setTrendingCoins(trendingResponse.data.coins.slice(0, 10)); // Top 10 trending
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTrendingItem = ({ item }) => (
    <View style={styles(colors).trendingItem}>
      <Text style={styles(colors).coinName}>{item.item.name} ({item.item.symbol.toUpperCase()})</Text>
      <Text style={styles(colors).marketCapRank}>Rank: #{item.item.market_cap_rank}</Text>
      <Text style={styles(colors).price}>Price (BTC): {item.item.price_btc.toFixed(8)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles(colors).container}>
        <View style={styles(colors).loading}>
          <Text style={{ color: colors.textSecondary }}>Loading market data...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles(colors).mainContainer}>
      <View style={styles(colors).header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles(colors).title}>Market Overview</Text>
        <View style={styles(colors).headerRight}>
          <LocationMenu />
          <ThemeToggle />
        </View>
      </View>
      <ScrollView style={styles(colors).scrollContainer}>
        {globalData && (
          <View style={styles(colors).globalStats}>
            <Text style={styles(colors).sectionTitle}>Global Statistics</Text>
            <View style={styles(colors).statCard}>
              <Text style={styles(colors).statLabel}>Total Market Cap</Text>
              <Text style={styles(colors).statValue}>${globalData.total_market_cap.usd.toLocaleString()}</Text>
            </View>
            <View style={styles(colors).statCard}>
              <Text style={styles(colors).statLabel}>24h Volume</Text>
              <Text style={styles(colors).statValue}>${globalData.total_volume.usd.toLocaleString()}</Text>
            </View>
            <View style={styles(colors).statCard}>
              <Text style={styles(colors).statLabel}>BTC Dominance</Text>
              <Text style={styles(colors).statValue}>{globalData.market_cap_percentage.btc.toFixed(1)}%</Text>
            </View>
            <View style={styles(colors).statCard}>
              <Text style={styles(colors).statLabel}>ETH Dominance</Text>
              <Text style={styles(colors).statValue}>{globalData.market_cap_percentage.eth.toFixed(1)}%</Text>
            </View>
            <View style={styles(colors).statCard}>
              <Text style={styles(colors).statLabel}>Active Cryptocurrencies</Text>
              <Text style={styles(colors).statValue}>{globalData.active_cryptocurrencies}</Text>
            </View>
          </View>
        )}

        <View style={styles(colors).trendingSection}>
          <Text style={styles(colors).sectionTitle}>Trending Coins</Text>
          <FlatList
            data={trendingCoins}
            renderItem={renderTrendingItem}
            keyExtractor={(item) => item.item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = (colors) => StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalStats: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: colors.card,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  trendingSection: {
    padding: 20,
    paddingTop: 0,
  },
  trendingItem: {
    backgroundColor: colors.card,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  marketCapRank: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default MarketOverviewScreen;