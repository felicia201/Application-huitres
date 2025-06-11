import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../theme';

export default function Accueil() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../utils/logo.png')} // ← ton logo ici
        style={styles.logo}
      />
      <Text style={styles.title}>Application Ostréicole</Text>
      <Text style={styles.subtitle}>Gérez vos semis et récoltes en mer</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ajouter-action')}>
        <Text style={styles.buttonText}>➕ Nouvelle action</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/liste-actions')}>
        <Text style={styles.buttonText}>📋 Voir les actions</Text>
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
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
