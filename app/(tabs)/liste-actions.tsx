import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
// Pour stocker et lire des données localement
import AsyncStorage from '@react-native-async-storage/async-storage';

// On importe deux fonctions qu'on a créées pour envoyer et recevoir les données avec un serveur

import {
  synchroniserActions,
  recupererActionsServeur,
} from '../utils/synchroniser';
import { COLORS, STYLES } from '../theme';
// Composant principal qui affiche la liste des actions
export default function ListeActions() {
    // `actions` contient les données affichées à l’écran, `setActions` permet de les modifier
  const [actions, setActions] = useState([]);

  // Fonction qui lit les actions enregistrées localement et les charge dans l’écran
  const chargerActionsLocales = async () => {
    const data = await AsyncStorage.getItem('actions');// recupere l'action
    const parsed = data ? JSON.parse(data) : []; // / Si y’a des données, on les convertit depuis JSON
    setActions(parsed);
    console.log("📦 Actions locales :", parsed);
  };

  useEffect(() => {
    chargerActionsLocales();
  }, []);
// pour supprimer une action locale en fonction de son ID
  const supprimerAction = async (id) => {
    const data = await AsyncStorage.getItem('actions');
    const liste = data ? JSON.parse(data) : [];
    const nouveau = liste.filter((a) => a.id !== id);
    await AsyncStorage.setItem('actions', JSON.stringify(nouveau));
    setActions(nouveau);
  };
// Supprimer toutes les actions locales
  const viderActions = async () => {
    await AsyncStorage.removeItem('actions');
    setActions([]);
    Alert.alert('🧹 Actions supprimées localement');
  };

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>📋 Actions enregistrées</Text>

      <TouchableOpacity
        style={STYLES.button}
        onPress={async () => {
          const res = await synchroniserActions();
          Alert.alert(res.status, res.count ? `${res.count} action(s) envoyée(s)` : '');
          chargerActionsLocales();
        }}
      >
        <Text style={STYLES.buttonText}>🔄 Synchroniser</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={STYLES.button}
        onPress={async () => {
          const res = await recupererActionsServeur();
          if (res.status === 'OK') {
            console.log(" Données serveur :", res.actions); // log debug
            setActions(res.actions);
          } else {
            Alert.alert('Erreur', res.message);
          }
        }}
      >
        <Text style={STYLES.buttonText}>📥 Télécharger du serveur</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[STYLES.button, { backgroundColor: '#E74C3C' }]}
        onPress={viderActions}
      >
        <Text style={STYLES.buttonText}>🧹 Vider tout</Text>
      </TouchableOpacity>

      <FlatList
        data={actions}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={STYLES.card}>
            <Text style={styles.label}>📅 {new Date(item.date || Date.now()).toLocaleString()}</Text>
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
