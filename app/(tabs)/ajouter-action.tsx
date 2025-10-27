import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../../src/config';

export default function AjouterAction() {
  const router = useRouter();

  const [typeAction, setTypeAction] = useState('');
  const [quantite, setQuantite] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [maree, setMaree] = useState('');
  const [auteur, setAuteur] = useState('');

  const enregistrerAction = async () => {
    if (!typeAction || !quantite) {
      Alert.alert('Erreur', 'Type et quantité sont obligatoires.');
      return;
    }

    const nouvelleAction = {
      type: typeAction,
      quantite: parseInt(quantite),
      commentaire,
      maree,
      auteur,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([nouvelleAction]),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('✅ Action enregistrée', result.message);
        router.push('/liste-actions');
      } else {
        Alert.alert('Erreur', result.error || 'Échec de l’enregistrement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Connexion au serveur impossible');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/beach-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <Text style={styles.title}>🌊 Ajouter une Action</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Type d'action :</Text>
            <TextInput
              style={styles.input}
              value={typeAction}
              onChangeText={setTypeAction}
              placeholder="ex: semis / récolte"
              placeholderTextColor="#8fbcd4"
            />

            <Text style={styles.label}>Quantité :</Text>
            <TextInput
              style={styles.input}
              value={quantite}
              onChangeText={setQuantite}
              keyboardType="numeric"
              placeholder="ex: 150"
              placeholderTextColor="#8fbcd4"
            />

            <Text style={styles.label}>Commentaire :</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={commentaire}
              onChangeText={setCommentaire}
              multiline
              placeholder="facultatif"
              placeholderTextColor="#8fbcd4"
            />

            <Text style={styles.label}>Type de marée :</Text>
            <TextInput
              style={styles.input}
              value={maree}
              onChangeText={setMaree}
              placeholder="ex: basse, coef 90"
              placeholderTextColor="#8fbcd4"
            />

            <Text style={styles.label}>Nom du conchyliculteur :</Text>
            <TextInput
              style={styles.input}
              value={auteur}
              onChangeText={setAuteur}
              placeholder="ex: Jean Martin"
              placeholderTextColor="#8fbcd4"
            />

            <TouchableOpacity style={styles.button} onPress={enregistrerAction}>
              <Text style={styles.buttonText}>💾 Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a4d7c',
    textAlign: 'center',
    marginBottom: 25,
  },
  form: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 15, padding: 15 },
  label: { color: '#1a4d7c', fontWeight: '600', marginBottom: 5, marginTop: 10 },
  input: {
    backgroundColor: '#e6f3f9',
    borderWidth: 1,
    borderColor: '#a2d5f2',
    borderRadius: 10,
    padding: 12,
    color: '#00334e',
  },
  button: {
    backgroundColor: '#2b8cc4',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
