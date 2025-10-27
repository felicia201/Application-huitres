import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { API_URL } from '../../src/config';

export default function ListeActions() {
  const [actions, setActions] = useState([]);

  const chargerActionsDepuisServeur = async () => {
    try {
      const response = await fetch(`${API_URL}/actions`);
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
      const data = await response.json();
      setActions(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de récupérer les actions.');
    }
  };

  useEffect(() => {
    chargerActionsDepuisServeur();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/beach-bg.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>📋 Actions enregistrées</Text>

          {actions.length === 0 ? (
            <Text style={styles.emptyText}>
              Aucune action enregistrée pour le moment 🌾
            </Text>
          ) : (
            <FlatList
              data={actions}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.date}>
                    📅 {new Date(item.date).toLocaleString()}
                  </Text>
                  <Text>👤 {item.auteur}</Text>
                  <Text>🌊 Marée : {item.maree}</Text>
                  <Text>🧪 Type : {item.type}</Text>
                  <Text>📦 Quantité : {item.quantite}</Text>
                  {item.commentaire && <Text>📝 {item.commentaire}</Text>}
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004f72',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#e6f5fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2b8cc4',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  date: { fontWeight: 'bold', color: '#006b8f', marginBottom: 5 },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#0077a3',
    marginTop: 40,
  },
});
