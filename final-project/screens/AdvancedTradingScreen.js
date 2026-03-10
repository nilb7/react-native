import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';
import Footer from '../components/Footer';

const AdvancedTradingScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { crypto } = route.params || { crypto: { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc' } };
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const generateChartData = (timeframe) => {
    let dataPoints = [];
    let labels = [];

    if (timeframe === '1H') {
      dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000 + 40000));
      labels = ['0h', '2h', '4h', '6h', '8h', '10h'];
    } else if (timeframe === '4H') {
      dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000 + 40000));
      labels = ['0h', '4h', '8h', '12h', '16h', '20h'];
    } else if (timeframe === '1D') {
      dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000 + 40000));
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    } else if (timeframe === '1W') {
      dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000 + 40000));
      labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
    } else if (timeframe === '1M') {
      dataPoints = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000 + 40000));
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    }

    return {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          strokeWidth: 2,
          color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
        },
      ],
    };
  };

  const chartData = generateChartData(selectedTimeframe);

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles(colors).title}>Advanced Trading</Text>
        <ThemeToggle />
      </View>

      <View style={styles(colors).cryptoHeader}>
        <Text style={styles(colors).cryptoName}>{crypto.name}</Text>
        <Text style={styles(colors).cryptoSymbol}>{crypto.symbol.toUpperCase()}</Text>
      </View>

      <View style={styles(colors).timeframeContainer}>
        {['1H', '4H', '1D', '1W', '1M'].map((timeframe) => (
          <TouchableOpacity
            key={timeframe}
            style={[
              styles(colors).timeframeButton,
              selectedTimeframe === timeframe && styles(colors).timeframeButtonActive,
            ]}
            onPress={() => setSelectedTimeframe(timeframe)}
          >
            <Text
              style={[
                styles(colors).timeframeText,
                selectedTimeframe === timeframe && styles(colors).timeframeTextActive,
              ]}
            >
              {timeframe}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles(colors).scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles(colors).chartContainer}>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 20}
            height={300}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.isDarkMode ? '#1e1e1e' : '#fff',
              backgroundGradientTo: colors.isDarkMode ? '#2a2a2a' : '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
              labelColor: (opacity = 1) => `${colors.textSecondary}`,
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

        <View style={styles(colors).statsContainer}>
          <View style={styles(colors).statCard}>
            <Text style={styles(colors).statLabel}>24h High</Text>
            <Text style={styles(colors).statValue}>$52,450</Text>
          </View>
          <View style={styles(colors).statCard}>
            <Text style={styles(colors).statLabel}>24h Low</Text>
            <Text style={styles(colors).statValue}>$49,230</Text>
          </View>
        </View>

        <View style={styles(colors).statsContainer}>
          <View style={styles(colors).statCard}>
            <Text style={styles(colors).statLabel}>24h Volume</Text>
            <Text style={styles(colors).statValue}>$28.5B</Text>
          </View>
          <View style={styles(colors).statCard}>
            <Text style={styles(colors).statLabel}>Market Cap</Text>
            <Text style={styles(colors).statValue}>$1.2T</Text>
          </View>
        </View>

        <View style={styles(colors).infoContainer}>
          <Text style={styles(colors).infoTitle}>Technical Analysis</Text>
          <Text style={styles(colors).infoText}>
            • RSI (14): 65 - Approaching overbought conditions
          </Text>
          <Text style={styles(colors).infoText}>
            • MACD: Bullish signal with increasing momentum
          </Text>
          <Text style={styles(colors).infoText}>
            • Moving Average: Price above 50-day MA - Uptrend
          </Text>
          <Text style={styles(colors).infoText}>
            • Support Level: $49,500
          </Text>
          <Text style={styles(colors).infoText}>
            • Resistance Level: $53,200
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  cryptoHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  cryptoSymbol: {
    fontSize: 16,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeframeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeframeText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 12,
  },
  timeframeTextActive: {
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chart: {
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  infoContainer: {
    backgroundColor: colors.card,
    margin: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default AdvancedTradingScreen;
