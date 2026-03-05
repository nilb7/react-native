import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const BurgerMenu = ({ navigation }) => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const menuItems = [
    { id: 'home', title: 'Home', icon: 'home-outline', screen: 'HomeTab' },
    { id: 'portfolio', title: 'Portfolio', icon: 'wallet-outline', screen: 'Portfolio' },
    { id: 'market', title: 'Market Overview', icon: 'stats-chart-outline', screen: 'Market' },
    { id: 'contact', title: 'Contact Us', icon: 'call-outline', screen: 'ContactUs' },
  ];

  const handleMenuPress = (item) => {
    setIsVisible(false);
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles(colors).menuItem}
      onPress={() => handleMenuPress(item)}
    >
      <Ionicons name={item.icon} size={24} color={colors.text} />
      <Text style={styles(colors).menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles(colors).burgerButton}
        onPress={() => setIsVisible(true)}
      >
        <Ionicons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles(colors).modalOverlay}>
          <View style={styles(colors).menuContainer}>
            <View style={styles(colors).menuHeader}>
              <Text style={styles(colors).menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              style={styles(colors).menuList}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = (colors) => StyleSheet.create({
  burgerButton: {
    padding: 10,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: colors.card,
    width: '70%',
    height: '100%',
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 15,
  },
});

export default BurgerMenu;