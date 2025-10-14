import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://127.0.0.1:3000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erreur', data.error || 'Connexion échouée');
        return;
      }

      Alert.alert('Bienvenue', `Bonjour ${data.user.username}`);
      router.replace('/');
    } catch (error) {
      console.log('Erreur login:', error);
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80',
      }}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🌞 Bienvenue sur l'appli ostréicole</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Adresse e-mail"
            placeholderTextColor="#f0f8ff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#f0f8ff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>
              Pas encore de compte ? <Text style={styles.linkHighlight}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 64, 128, 0.45)', 
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fffbe6',
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00a8e8',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#00a8e8',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fffbe6',
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
  },
  linkHighlight: {
    color: '#ffdb58', 
    fontWeight: 'bold',
  },
});
