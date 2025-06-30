import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { COLORS, STYLES } from '../theme';

export default function ListeActions() {
  const [actions, setActions] = useState([]);

  const chargerActionsDepuisServeur = async () => {
    try {
      const response = await fetch('http://localhost:3000/actions'); // 🔁 Remplace par l'URL de ton backend
      const data = await response.json();
      setActions(data);
    } catch (error) {
      Alert.alert('Erreur', "Impossible de récupérer les actions.");
      console.error(error);
    }
  };

  useEffect(() => {
    chargerActionsDepuisServeur();
  }, []);

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>📋 Actions enregistrées</Text>

      <FlatList
        data={actions}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={STYLES.card}>
            <Text style={styles.label}>📅 {new Date(item.date).toLocaleString()}</Text>
            <Text>👤 {item.auteur}</Text>
            <Text>🌊 Marée : {item.maree}</Text>
            <Text>🧪 Type : {item.type}</Text>
            <Text>📦 Quantité : {item.quantite}</Text>
            {item.commentaire && <Text>📝 {item.commentaire}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
});

