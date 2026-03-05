import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        © 2026 Crypto Exchange App
      </Text>
      <Text style={[styles.subText, { color: colors.textMuted }]}>
        Powered by CoinGecko API
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Footer;