import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios';

const MarketOverviewScreen = () => {
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
    <View style={styles.trendingItem}>
      <Text style={styles.coinName}>{item.item.name} ({item.item.symbol.toUpperCase()})</Text>
      <Text style={styles.marketCapRank}>Rank: #{item.item.market_cap_rank}</Text>
      <Text style={styles.price}>Price: ${item.item.price_btc ? (item.item.price_btc * globalData?.market_cap_percentage?.btc / 100).toFixed(2) : 'N/A'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Market Overview</Text>
        </View>
        <View style={styles.loading}>
          <Text>Loading market data...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Overview</Text>
      </View>

      {globalData && (
        <View style={styles.globalStats}>
          <Text style={styles.sectionTitle}>Global Statistics</Text>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Market Cap</Text>
            <Text style={styles.statValue}>${globalData.total_market_cap.usd.toLocaleString()}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>24h Volume</Text>
            <Text style={styles.statValue}>${globalData.total_volume.usd.toLocaleString()}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>BTC Dominance</Text>
            <Text style={styles.statValue}>{globalData.market_cap_percentage.btc.toFixed(1)}%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ETH Dominance</Text>
            <Text style={styles.statValue}>{globalData.market_cap_percentage.eth.toFixed(1)}%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Cryptocurrencies</Text>
            <Text style={styles.statValue}>{globalData.active_cryptocurrencies}</Text>
          </View>
        </View>
      )}

      <View style={styles.trendingSection}>
        <Text style={styles.sectionTitle}>Trending Coins</Text>
        <FlatList
          data={trendingCoins}
          renderItem={renderTrendingItem}
          keyExtractor={(item) => item.item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trendingSection: {
    padding: 20,
    paddingTop: 0,
  },
  trendingItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  marketCapRank: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: 'bold',
  },
});

export default MarketOverviewScreen;