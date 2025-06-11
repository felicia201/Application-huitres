import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { synchroniserActions, recupererActionsServeur } from '../utils/synchroniser';

export default function ListeActions() {
  const [actions, setActions] = useState([]);

  const chargerActionsLocales = async () => {
    const data = await AsyncStorage.getItem('actions');
    setActions(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    chargerActionsLocales();
  }, []);

  // 🔁 Supprimer une action locale
  const supprimerAction = async (id) => {
    const data = await AsyncStorage.getItem('actions');
    const actions = data ? JSON.parse(data) : [];

    const nouvellesActions = actions.filter((a) => a.id !== id);

    await AsyncStorage.setItem('actions', JSON.stringify(nouvellesActions));
    setActions(nouvellesActions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Liste des Actions</Text>

      <Button
        title="🔄 Synchroniser vers le serveur"
        onPress={async () => {
          const res = await synchroniserActions();
          Alert.alert(res.status, res.count ? `${res.count} actions envoyées.` : '');
          chargerActionsLocales();
        }}
      />

      <Button
        title="📥 Télécharger depuis le serveur"
        onPress={async () => {
          const res = await recupererActionsServeur();
          if (res.status === 'OK') {
            setActions(res.actions);
          } else {
            Alert.alert('Erreur', res.message);
          }
        }}
      />

      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Type : {item.type}</Text>
            <Text>Quantité : {item.quantite}</Text>
            <Text>Commentaire : {item.commentaire || 'N/A'}</Text>
            <Button title="🗑️ Supprimer" onPress={() => supprimerAction(item.id)} />
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
});

