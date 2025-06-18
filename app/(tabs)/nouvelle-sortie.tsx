import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { STYLES, COLORS } from '../theme';

export default function NouvelleSortie() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');

  const handleSave = () => {
    if (!date || !lieu) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    Alert.alert('Sortie enregistrée', `📅 Date : ${date}\n📍 Lieu : ${lieu}`);
    router.push('/ajouter-action');
  };

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>⛵ Nouvelle Sortie en Mer</Text>

      <Text style={styles.label}>Date :</Text>
      <TextInput
        placeholder="JJ/MM/AAAA"
        value={date}
        onChangeText={setDate}
        style={STYLES.input}
      />

      <Text style={styles.label}>Lieu :</Text>
      <TextInput
        placeholder="Ex : Zone C3"
        value={lieu}
        onChangeText={setLieu}
        style={STYLES.input}
      />

      <TouchableOpacity style={STYLES.button} onPress={handleSave}>
        <Text style={STYLES.buttonText}> Enregistrer la sortie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    color: COLORS.text,
    fontWeight: 'bold',
  },
});
