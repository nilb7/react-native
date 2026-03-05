import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';
import Footer from '../components/Footer';

const PortfolioScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [portfolio, setPortfolio] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadPortfolio();
    }, [])
  );

  const loadPortfolio = async () => {
    try {
      const data = await AsyncStorage.getItem('portfolio');
      if (data) {
        setPortfolio(JSON.parse(data));
      } else {
        setPortfolio([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles(colors).item}>
      <Text style={styles(colors).name}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <Text style={{ color: colors.textSecondary }}>Amount: {item.amount}</Text>
      <Text style={{ color: colors.textSecondary }}>Buy Price: ${item.buyPrice.toFixed(2)}</Text>
      <Text style={{ color: colors.textSecondary }}>Buy Date: {new Date(item.buyDate).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles(colors).title}>Portfolio</Text>
        <ThemeToggle />
      </View>
      {portfolio.length > 0 ? (
        <FlatList
          data={portfolio}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles(colors).emptyContainer}>
          <Text style={styles(colors).empty}>No holdings yet. Buy some crypto!</Text>
        </View>
      )}
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
  item: {
    backgroundColor: colors.card,
    margin: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default PortfolioScreen;