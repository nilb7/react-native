import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Custom Drawer Content Example
export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Welcome!</Text>
        <Text style={styles.profileEmail}>student@email.com</Text>
      </View>
      <View style={styles.drawerListSection}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerText}>© 2026 MyApp</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#e3f2fd',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#1976d2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  profileEmail: {
    color: '#bbdefb',
    fontSize: 13,
    marginBottom: 5,
  },
  drawerListSection: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#1976d2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});
