import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const LocationMenu = () => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const locations = [
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Sydney, Australia',
    'Berlin, Germany',
    'Paris, France',
    'Toronto, Canada',
    'Singapore',
    'Mumbai, India',
    'São Paulo, Brazil',
  ];

  const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
  };

  const handleLocationPress = () => {
    const randomLocation = getRandomLocation();
    Alert.alert(
      'Random Location',
      `Your random location is: ${randomLocation}`,
      [{ text: 'OK' }]
    );
  };

  const handleCurrentLocation = () => {
    Alert.alert(
      'Current Location',
      'Location services would be implemented here',
      [{ text: 'OK' }]
    );
  };

  const handleNearbyPlaces = () => {
    Alert.alert(
      'Nearby Places',
      'Nearby crypto exchanges and ATMs would be shown here',
      [{ text: 'OK' }]
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles(colors).locationButton}
        onPress={() => setIsVisible(true)}
      >
        <Ionicons name="location" size={24} color={colors.text} />
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
              <Text style={styles(colors).menuTitle}>Location</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles(colors).menuContent}>
              <TouchableOpacity
                style={styles(colors).menuItem}
                onPress={handleCurrentLocation}
              >
                <Ionicons name="navigate" size={24} color={colors.primary} />
                <Text style={styles(colors).menuText}>Current Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles(colors).menuItem}
                onPress={handleLocationPress}
              >
                <Ionicons name="shuffle" size={24} color={colors.primary} />
                <Text style={styles(colors).menuText}>Random Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles(colors).menuItem}
                onPress={handleNearbyPlaces}
              >
                <Ionicons name="map" size={24} color={colors.primary} />
                <Text style={styles(colors).menuText}>Nearby Places</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = (colors) => StyleSheet.create({
  locationButton: {
    padding: 10,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContainer: {
    backgroundColor: colors.card,
    width: '70%',
    height: '100%',
    paddingTop: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
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
  menuContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
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

export default LocationMenu;