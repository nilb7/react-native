import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import Footer from '../components/Footer';

const CryptoDetailScreen = ({ route, navigation }) => {
  const { crypto } = route.params;
  const { colors } = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=7`);
      const prices = response.data.prices.map(price => price[1]);
      setChartData(prices);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = async () => {
    const amount = 1; // For simplicity, buying 1 unit. You can add input for amount later.
    const holding = {
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      amount: amount,
      buyPrice: crypto.current_price,
      buyDate: new Date().toISOString(),
    };
    try {
      const portfolio = await AsyncStorage.getItem('portfolio');
      const portfolioArray = portfolio ? JSON.parse(portfolio) : [];
      portfolioArray.push(holding);
      await AsyncStorage.setItem('portfolio', JSON.stringify(portfolioArray));
      Alert.alert('Success', `Bought ${amount} ${crypto.name} at $${crypto.current_price}`);
      navigation.navigate('Portfolio');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save to portfolio');
    }
  };

  const handleSell = async () => {
    try {
      const portfolio = await AsyncStorage.getItem('portfolio');
      const portfolioArray = portfolio ? JSON.parse(portfolio) : [];
      const index = portfolioArray.findIndex(holding => holding.id === crypto.id);
      if (index !== -1) {
        const holding = portfolioArray[index];
        if (holding.amount > 1) {
          holding.amount -= 1;
        } else {
          portfolioArray.splice(index, 1);
        }
        await AsyncStorage.setItem('portfolio', JSON.stringify(portfolioArray));
        Alert.alert('Success', `Sold 1 ${crypto.name} at $${crypto.current_price}`);
        navigation.navigate('Portfolio');
      } else {
        Alert.alert('Error', `You don't have any ${crypto.name} to sell`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to sell from portfolio');
    }
  };

  return (
    <View style={styles(colors).container}>
      <ScrollView style={styles(colors).scrollContainer}>
        <View style={styles(colors).header}>
          <Text style={styles(colors).title}>{crypto.name} ({crypto.symbol.toUpperCase()})</Text>
        </View>
        <View style={styles(colors).card}>
          <Text style={styles(colors).price}>Current Price: ${crypto.current_price.toFixed(2)}</Text>
          <Text style={[styles(colors).change, crypto.price_change_percentage_24h > 0 ? styles(colors).positive : styles(colors).negative]}>
            24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
          </Text>
          <Text style={styles(colors).info}>Market Cap: ${crypto.market_cap ? crypto.market_cap.toLocaleString() : 'N/A'}</Text>
          <Text style={styles(colors).info}>24h High: ${crypto.high_24h ? crypto.high_24h.toFixed(2) : 'N/A'}</Text>
          <Text style={styles(colors).info}>24h Low: ${crypto.low_24h ? crypto.low_24h.toFixed(2) : 'N/A'}</Text>
          <Text style={styles(colors).info}>Total Volume: ${crypto.total_volume ? crypto.total_volume.toLocaleString() : 'N/A'}</Text>
        </View>
        {chartData.length > 0 && (
          <View style={styles(colors).chartContainer}>
            <LineChart
              data={{
                datasets: [{
                  data: chartData,
                }],
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: colors.isDarkMode ? '#1e1e1e' : '#667eea',
                backgroundGradientFrom: colors.isDarkMode ? '#1e1e1e' : '#667eea',
                backgroundGradientTo: colors.isDarkMode ? '#333333' : '#764ba2',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: colors.primary,
                },
              }}
              bezier
              style={styles(colors).chart}
            />
          </View>
        )}
        <View style={styles(colors).buttons}>
          <TouchableOpacity style={[styles(colors).button, styles(colors).buyButton]} onPress={handleBuy}>
            <Text style={styles(colors).buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles(colors).button, styles(colors).sellButton]} onPress={handleSell}>
            <Text style={styles(colors).buttonText}>Sell</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles(colors).button, styles(colors).chartButton]} onPress={() => navigation.navigate('AdvancedTrading', { crypto })}>
            <Text style={styles(colors).buttonText}>Chart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.header,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  change: {
    fontSize: 18,
    marginBottom: 15,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
  info: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buyButton: {
    backgroundColor: colors.positive,
  },
  sellButton: {
    backgroundColor: colors.negative,
  },
  chartButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CryptoDetailScreen;