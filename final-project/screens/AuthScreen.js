import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';

const AuthScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [storedUsers, setStoredUsers] = useState([]);

  React.useEffect(() => {
    const loadUsers = async () => {
      const u = await AsyncStorage.getItem('users');
      setStoredUsers(u ? JSON.parse(u) : []);
    };
    loadUsers();
  }, []);

  const handleSignup = async () => {
    console.log('handleSignup called with', email, password, confirm);
    Alert.alert('Info', 'Signing up...');
    if (!email || !password || !confirm) {
      Alert.alert('Validation', 'Please complete all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Validation', 'Passwords do not match.');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : [];

      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        Alert.alert('Error', 'An account with that email already exists.');
        return;
      }

      users.push({ email: email.toLowerCase(), password });
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('currentUser', email.toLowerCase());
      setStoredUsers(users);
      console.log('signup successful, users:', users);
      Alert.alert('Success', `Account created for ${email}`);
      const verify = await AsyncStorage.getItem('users');
      console.log('storage now contains:', verify);
      navigation.goBack();
    } catch (err) {
      console.error('signup error', err);
      Alert.alert('Error', 'Failed to create account.');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter both email and password.');
      return;
    }
    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : [];
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        Alert.alert('Error', 'No account found with that email.');
        return;
      }
      if (found.password !== password) {
        Alert.alert('Error', 'Incorrect password.');
        return;
      }
      await AsyncStorage.setItem('currentUser', email.toLowerCase());
      Alert.alert('Success', 'Logged in!');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Login failed.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles(colors).container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles(colors).header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles(colors).backButton}>
            <Text style={styles(colors).backText}>&larr; Back</Text>
          </TouchableOpacity>
          <Text style={styles(colors).title}>Account</Text>
          <ThemeToggle />
        </View>

        <View style={styles(colors).form}>
          <TextInput
            style={styles(colors).input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles(colors).input}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles(colors).input}
            placeholder="Confirm Password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity
            style={[styles(colors).button, styles(colors).signupButton]}
            onPress={handleSignup}
          >
            <Text style={styles(colors).buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(colors).button, styles(colors).loginButton]}
            onPress={handleLogin}
          >
            <Text style={styles(colors).buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        {/* debug: list stored users */}
        {storedUsers.length > 0 && (
          <View style={styles(colors).debugContainer}>
            <Text style={styles(colors).debugTitle}>Saved users</Text>
            {storedUsers.map((u, idx) => (
              <Text key={idx} style={styles(colors).debugUser}>{u.email}</Text>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  backButton: {
    padding: 6,
  },
  backText: {
    color: colors.primary,
    fontSize: 14,
  },
  /* switchContainer, switchButton styles removed */
  signupButton: {
    backgroundColor: colors.positive,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  debugContainer: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  debugUser: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AuthScreen;