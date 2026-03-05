import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import BurgerMenu from '../components/BurgerMenu';
import LocationMenu from '../components/LocationMenu';
import Footer from '../components/Footer';

const ContactUsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const contactInfo = {
    email: 'support@cryptoexchange.com',
    phone: '+1 (555) 123-4567',
    address: '123 Crypto Street, Blockchain City, BC 12345',
    hours: 'Mon-Fri: 9AM-6PM EST',
    social: {
      twitter: '@CryptoExchange',
      linkedin: 'CryptoExchange',
      github: 'crypto-exchange'
    }
  };

  const officeLocations = [
    {
      city: 'New York, USA',
      address: '123 Wall Street, New York, NY 10005',
      phone: '+1 (212) 555-0123'
    },
    {
      city: 'London, UK',
      address: '45 Crypto Lane, London, EC2V 7HH',
      phone: '+44 20 7123 4567'
    },
    {
      city: 'Singapore',
      address: '88 Marina Bay, Singapore 018956',
      phone: '+65 6789 0123'
    }
  ];

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleSocialPress = (platform, handle) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/${handle}`;
        break;
      case 'linkedin':
        url = `https://linkedin.com/company/${handle}`;
        break;
      case 'github':
        url = `https://github.com/${handle}`;
        break;
    }
    Linking.openURL(url);
  };

  const handleLocationPress = (location) => {
    // In a real app, this would open maps
    Alert.alert(
      'Location',
      `Address: ${location.address}\nPhone: ${location.phone}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).header}>
        <BurgerMenu navigation={navigation} />
        <Text style={styles(colors).title}>Contact Us</Text>
        <LocationMenu />
      </View>

      <ScrollView style={styles(colors).scrollContainer}>
        <View style={styles(colors).content}>
          {/* Hero Section */}
          <View style={styles(colors).heroCard}>
            <Ionicons name="headset" size={48} color={colors.primary} />
            <Text style={styles(colors).heroTitle}>Get in Touch</Text>
            <Text style={styles(colors).heroSubtitle}>
              We're here to help with all your crypto exchange needs
            </Text>
          </View>

          {/* Contact Information */}
          <View style={styles(colors).contactCard}>
            <Text style={styles(colors).sectionTitle}>Contact Information</Text>

            <TouchableOpacity
              style={styles(colors).contactItem}
              onPress={handleEmailPress}
            >
              <Ionicons name="mail" size={24} color={colors.primary} />
              <View style={styles(colors).contactText}>
                <Text style={styles(colors).contactLabel}>Email</Text>
                <Text style={styles(colors).contactValue}>{contactInfo.email}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles(colors).contactItem}
              onPress={() => handlePhonePress(contactInfo.phone)}
            >
              <Ionicons name="call" size={24} color={colors.primary} />
              <View style={styles(colors).contactText}>
                <Text style={styles(colors).contactLabel}>Phone</Text>
                <Text style={styles(colors).contactValue}>{contactInfo.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles(colors).contactItem}>
              <Ionicons name="location" size={24} color={colors.primary} />
              <View style={styles(colors).contactText}>
                <Text style={styles(colors).contactLabel}>Address</Text>
                <Text style={styles(colors).contactValue}>{contactInfo.address}</Text>
              </View>
            </View>

            <View style={styles(colors).contactItem}>
              <Ionicons name="time" size={24} color={colors.primary} />
              <View style={styles(colors).contactText}>
                <Text style={styles(colors).contactLabel}>Business Hours</Text>
                <Text style={styles(colors).contactValue}>{contactInfo.hours}</Text>
              </View>
            </View>
          </View>

          {/* Office Locations */}
          <View style={styles(colors).locationsCard}>
            <Text style={styles(colors).sectionTitle}>Our Locations</Text>
            {officeLocations.map((location, index) => (
              <TouchableOpacity
                key={index}
                style={styles(colors).locationItem}
                onPress={() => handleLocationPress(location)}
              >
                <View style={styles(colors).locationHeader}>
                  <Ionicons name="business" size={20} color={colors.primary} />
                  <Text style={styles(colors).locationCity}>{location.city}</Text>
                </View>
                <Text style={styles(colors).locationAddress}>{location.address}</Text>
                <Text style={styles(colors).locationPhone}>{location.phone}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Social Media */}
          <View style={styles(colors).socialCard}>
            <Text style={styles(colors).sectionTitle}>Follow Us</Text>
            <View style={styles(colors).socialContainer}>
              <TouchableOpacity
                style={styles(colors).socialButton}
                onPress={() => handleSocialPress('twitter', contactInfo.social.twitter)}
              >
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                <Text style={styles(colors).socialText}>Twitter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles(colors).socialButton}
                onPress={() => handleSocialPress('linkedin', contactInfo.social.linkedin)}
              >
                <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
                <Text style={styles(colors).socialText}>LinkedIn</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles(colors).socialButton}
                onPress={() => handleSocialPress('github', contactInfo.social.github)}
              >
                <Ionicons name="logo-github" size={24} color={colors.text} />
                <Text style={styles(colors).socialText}>GitHub</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Options */}
          <View style={styles(colors).supportCard}>
            <Text style={styles(colors).sectionTitle}>Support</Text>
            <Text style={styles(colors).supportText}>
              Need help? Our support team is available 24/7 for technical assistance,
              account issues, and trading questions.
            </Text>
            <TouchableOpacity
              style={styles(colors).supportButton}
              onPress={handleEmailPress}
            >
              <Text style={styles(colors).supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: colors.header,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactText: {
    flex: 1,
    marginLeft: 15,
  },
  contactLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  locationsCard: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  locationItem: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationCity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 10,
  },
  locationAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  locationPhone: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  socialCard: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    alignItems: 'center',
    padding: 10,
  },
  socialText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5,
  },
  supportCard: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: colors.isDarkMode ? 0.3 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  supportText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  supportButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactUsScreen;