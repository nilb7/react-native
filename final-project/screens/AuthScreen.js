import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import BurgerMenu from '../components/BurgerMenu';

const AuthScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const route = useRoute();
  const mode = route.params?.mode;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSignup, setIsSignup] = useState(mode !== 'login'); // true for signup, false for login
  const [storedUsers, setStoredUsers] = useState([]);

  React.useEffect(() => {
    const loadUsers = async () => {
      const u = await AsyncStorage.getItem('users');
      setStoredUsers(u ? JSON.parse(u) : []);
    };
    loadUsers();
  }, []);

  React.useEffect(() => {
    if (!isSignup) {
      setConfirm('');
    }
  }, [isSignup]);

  const handleSignup = async () => {
    console.log('handleSignup called with', email, password, confirm);
    console.log('Alert: Info - Signing up...');
    if (!email || !password || !confirm) {
      console.log('Alert: Validation - Please complete all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Alert: Validation - Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      console.log('Alert: Validation - Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      console.log('Alert: Validation - Passwords do not match.');
      return;
    }

    try {
      console.log('Validations passed, trying to store user');
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : [];

      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        console.log('Alert: Error - An account with that email already exists.');
        return;
      }

      users.push({ email: email.toLowerCase(), password });
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('currentUser', email.toLowerCase());
      setStoredUsers(users);
      console.log('signup successful, users:', users);
      console.log('Alert: Success - Account created for ' + email);
      navigation.getParent().navigate('Portfolio');
    } catch (err) {
      console.error('signup error', err);
      console.log('Alert: Error - Failed to create account.');
    }
  };

  const handleLogin = async () => {
    console.log('handleLogin called with', email, password);
    if (!email || !password) {
      console.log('Alert: Validation - Please enter both email and password.');
      return;
    }
    try {
      const stored = await AsyncStorage.getItem('users');
      const users = stored ? JSON.parse(stored) : [];
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        console.log('Alert: Error - No account found with that email.');
        return;
      }
      if (found.password !== password) {
        console.log('Alert: Error - Incorrect password.');
        return;
      }
      await AsyncStorage.setItem('currentUser', email.toLowerCase());
      console.log('Alert: Success - Logged in!');
      navigation.getParent().navigate('Portfolio');
    } catch (err) {
      console.error(err);
      console.log('Alert: Error - Login failed.');
    }
  };

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles(colors).backButton}>
          <Text style={styles(colors).backText}>&larr; Back</Text>
        </TouchableOpacity>
        <Text style={styles(colors).title}>{isSignup ? 'Create Account' : 'Log In'}</Text>
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
        {isSignup && (
          <TextInput
            style={styles(colors).input}
            placeholder="Confirm Password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
        )}
        <Button
          title={isSignup ? 'Create Account' : 'Log In'}
          onPress={isSignup ? handleSignup : handleLogin}
          color={isSignup ? colors.positive : colors.primary}
        />
        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles(colors).switchText}>
            {isSignup ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default AuthScreen;