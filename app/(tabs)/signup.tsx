import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../theme';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Erreur', data.error || 'Inscription échouée');
        return;
      }

      Alert.alert('Compte créé', 'Redirection vers la connexion');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de s’inscrire');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../utils/login-bg.png')} style={styles.backgroundImage} /> */}
      <View style={styles.overlay}>
        <Text style={styles.greeting}>Créer un compte</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Déjà inscrit ? <Text style={styles.link}>Se connecter</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  link: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});
