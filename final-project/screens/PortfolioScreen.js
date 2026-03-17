import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';
import Footer from '../components/Footer';

const PortfolioScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [portfolio, setPortfolio] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadCurrentUser = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const loadPortfolio = async (user) => {
    if (user) {
      try {
        const data = await AsyncStorage.getItem('portfolio_' + user);
        if (data) {
          setPortfolio(JSON.parse(data));
        } else {
          setPortfolio([]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setPortfolio([]);
    }
  };

  const loadData = async () => {
    const user = await loadCurrentUser();
    await loadPortfolio(user);
  };

  const handleBuyMore = async (item) => {
    const amount = 1;
    try {
      const portfolio = await AsyncStorage.getItem('portfolio_' + currentUser);
      const portfolioArray = portfolio ? JSON.parse(portfolio) : [];
      const existingIndex = portfolioArray.findIndex(holding => holding.id === item.id);
      
      if (existingIndex !== -1) {
        // If crypto already exists, increase the amount
        portfolioArray[existingIndex].amount += amount;
      } else {
        // If crypto doesn't exist, create new entry
        const newHolding = {
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          amount: amount,
          buyPrice: item.buyPrice,
          buyDate: new Date().toISOString(),
        };
        portfolioArray.push(newHolding);
      }
      
      await AsyncStorage.setItem('portfolio_' + currentUser, JSON.stringify(portfolioArray));
      Alert.alert('Success', `Bought ${amount} ${item.name}`);
      loadPortfolio();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to buy more');
    }
  };

  const handleSell = async (item, index) => {
    try {
      const portfolio = await AsyncStorage.getItem('portfolio_' + currentUser);
      const portfolioArray = portfolio ? JSON.parse(portfolio) : [];
      if (portfolioArray[index].amount > 1) {
        portfolioArray[index].amount -= 1;
      } else {
        portfolioArray.splice(index, 1);
      }
      await AsyncStorage.setItem('portfolio_' + currentUser, JSON.stringify(portfolioArray));
      Alert.alert('Success', `Sold 1 ${item.name}`);
      loadPortfolio();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to sell');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles(colors).item}>
      <Text style={styles(colors).name}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <Text style={{ color: colors.textSecondary }}>Amount: {item.amount}</Text>
      <Text style={{ color: colors.textSecondary }}>Buy Price: ${item.buyPrice.toFixed(2)}</Text>
      <Text style={{ color: colors.textSecondary }}>Buy Date: {new Date(item.buyDate).toLocaleDateString()}</Text>
      <View style={styles(colors).buttonContainer}>
        <TouchableOpacity 
          style={styles(colors).buyButton}
          onPress={() => handleBuyMore(item)}
        >
          <Text style={styles(colors).buttonText}>Buy More</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles(colors).sellButton}
          onPress={() => handleSell(item, index)}
        >
          <Text style={styles(colors).buttonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles(colors).title}>Portfolio</Text>
        <ThemeToggle />
      </View>
      {currentUser && (
        <View style={styles(colors).userInfo}>
          <Text style={styles(colors).userInfoText}>Profile: {currentUser}</Text>
        </View>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: colors.positive,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sellButton: {
    flex: 1,
    backgroundColor: colors.negative,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
  userInfo: {
    padding: 15,
    backgroundColor: colors.card,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfoText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});

export default PortfolioScreen;