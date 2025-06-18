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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { COLORS, STYLES } from '../theme';

export default function Login() {
  const [pseudo, setPseudo] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!pseudo.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre prénom.');
      return;
    }

    await AsyncStorage.setItem('auteur', pseudo.trim());
    router.replace('/'); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../utils/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenue 👋</Text>
      <Text style={styles.subtitle}>Veuillez vous identifier</Text>

      {/* <Text style={styles.label}>Prénom :</Text> */}
      <TextInput
        style={STYLES.input}
        placeholder=" Clara"
        value={pseudo}
        onChangeText={setPseudo}
      />

      <TouchableOpacity style={STYLES.button} onPress={handleLogin}>
        <Text style={STYLES.buttonText}>✅ Entrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 25,
    borderRadius: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: '10%',
  },
});
