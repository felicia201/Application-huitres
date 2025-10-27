import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function NouvelleSortie() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');

  const handleSave = () => {
    if (!date || !lieu) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    Alert.alert(' Sortie enregistrée', ` Date : ${date}\n Lieu : ${lieu}`);
    router.push('/ajouter-action');
  };

  return (
    <ImageBackground
      source={require('../../assets/beach-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}> Nouvelle Sortie en Mer</Text>

          <Text style={styles.label}>Date :</Text>
          <TextInput
            placeholder="JJ/MM/AAAA"
            value={date}
            onChangeText={setDate}
            style={styles.input}
            placeholderTextColor="#8fbcd4"
          />

          <Text style={styles.label}>Lieu :</Text>
          <TextInput
            placeholder="Ex : Zone C3"
            value={lieu}
            onChangeText={setLieu}
            style={styles.input}
            placeholderTextColor="#8fbcd4"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>💾 Enregistrer la sortie</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004f72',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#006b8f',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e6f5fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a2d5f2',
    padding: 12,
    marginBottom: 15,
    color: '#00415a',
  },
  button: {
    backgroundColor: '#2b8cc4',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
