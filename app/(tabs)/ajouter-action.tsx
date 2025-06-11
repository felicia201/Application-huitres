import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AjouterAction() {
  const router = useRouter();
  const [typeAction, setTypeAction] = useState('');
  const [quantite, setQuantite] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const enregistrerAction = async () => {
    if (!typeAction || !quantite) {
      Alert.alert('Erreur', 'Type et quantité sont obligatoires.');
      return;
    }

    const nouvelleAction = {
      id: Date.now().toString(), // identifiant unique
      type: typeAction,
      quantite: parseInt(quantite),
      commentaire,
    };

    try {
      const anciennes = await AsyncStorage.getItem('actions');
      const liste = anciennes ? JSON.parse(anciennes) : [];
      liste.push(nouvelleAction);
      await AsyncStorage.setItem('actions', JSON.stringify(liste));
      Alert.alert('✅ Action enregistrée');
      router.push('/liste-actions');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d’enregistrer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une Action</Text>

      <Text>Type d'action :</Text>
      <TextInput
        placeholder="Ex : semis"
        value={typeAction}
        onChangeText={setTypeAction}
        style={styles.input}
      />

      <Text>Quantité :</Text>
      <TextInput
        placeholder="Ex : 100"
        value={quantite}
        onChangeText={setQuantite}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Commentaire :</Text>
      <TextInput
        placeholder="Facultatif"
        value={commentaire}
        onChangeText={setCommentaire}
        multiline
        style={[styles.input, { height: 60 }]}
      />

      <Button title="Enregistrer l'action" onPress={enregistrerAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});
