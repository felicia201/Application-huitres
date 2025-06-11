import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  synchroniserActions,
  recupererActionsServeur,
} from '../utils/synchroniser';
import { COLORS, STYLES } from '../theme';

export default function ListeActions() {
  const [actions, setActions] = useState([]);

  const chargerActionsLocales = async () => {
    const data = await AsyncStorage.getItem('actions');
    setActions(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    chargerActionsLocales();
  }, []);

  const supprimerAction = async (id) => {
    const data = await AsyncStorage.getItem('actions');
    const liste = data ? JSON.parse(data) : [];
    const nouveau = liste.filter((a) => a.id !== id);
    await AsyncStorage.setItem('actions', JSON.stringify(nouveau));
    setActions(nouveau);
  };

  const viderActions = async () => {
    await AsyncStorage.removeItem('actions');
    setActions([]);
    Alert.alert('🧹 Actions supprimées localement');
  };

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>📋 Actions enregistrées</Text>

      <TouchableOpacity style={STYLES.button} onPress={async () => {
        const res = await synchroniserActions();
        Alert.alert(res.status, res.count ? `${res.count} action(s) envoyée(s)` : '');
        chargerActionsLocales();
      }}>
        <Text style={STYLES.buttonText}>🔄 Synchroniser</Text>
      </TouchableOpacity>

      <TouchableOpacity style={STYLES.button} onPress={async () => {
        const res = await recupererActionsServeur();
        if (res.status === 'OK') {
          setActions(res.actions);
        } else {
          Alert.alert('Erreur', res.message);
        }
      }}>
        <Text style={STYLES.buttonText}>📥 Télécharger du serveur</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[STYLES.button, { backgroundColor: '#E74C3C' }]} onPress={viderActions}>
        <Text style={STYLES.buttonText}>🧹 Vider tout</Text>
      </TouchableOpacity>

      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={STYLES.card}>
            <Text style={styles.label}>📅 {new Date(item.date).toLocaleString()}</Text>
            <Text>👤 {item.auteur || 'Inconnu'}</Text>
            <Text>🌊 Marée : {item.maree || 'N/A'}</Text>
            <Text>🧪 Type : {item.type}</Text>
            <Text>📦 Quantité : {item.quantite}</Text>
            {item.commentaire && <Text>📝 {item.commentaire}</Text>}

            <TouchableOpacity
              onPress={() => supprimerAction(item.id)}
              style={[STYLES.button, { backgroundColor: '#E67E22', marginTop: 10 }]}
            >
              <Text style={STYLES.buttonText}>🗑️ Supprimer</Text>
            </TouchableOpacity>
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

