import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Pour naviguer entre les écrans

export default function NouvelleSortie() {
  const router = useRouter(); // Permet de naviguer vers d'autres écrans

  // États pour stocker les valeurs entrées dans le formulaire
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');

  // Fonction appelée quand on clique sur "Enregistrer la sortie"
  const handleSave = () => {
    if (!date || !lieu) {
      // Si un champ est vide, on affiche une alerte
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Affiche une alerte de confirmation (plus tard, on sauvegardera en local ou backend)
    Alert.alert('Sortie enregistrée', `Date : ${date}\nLieu : ${lieu}`);

    // Navigue vers l'écran d'ajout d'action (prochaine étape)
    router.push('/ajouter-action');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle Sortie en Mer</Text>

      <Text>Date :</Text>
      <TextInput
        placeholder="JJ/MM/AAAA"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <Text>Lieu :</Text>
      <TextInput
        placeholder="Ex : Zone C3"
        value={lieu}
        onChangeText={setLieu}
        style={styles.input}
      />

      <Button title="Enregistrer la sortie" onPress={handleSave} />
    </View>
  );
}

// Styles pour rendre l’écran plus joli
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ffff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});