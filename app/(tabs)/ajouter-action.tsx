import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, STYLES } from '../theme';

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
      const response = await fetch('http://localhost:3000/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([nouvelleAction]), // 👈 le backend attend un tableau
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
    <View style={STYLES.container}>
      <Text style={STYLES.title}>Ajouter une Action</Text>

      <Text>Type d'action :</Text>
      <TextInput style={STYLES.input} value={typeAction} onChangeText={setTypeAction} placeholder="semis / récolte" />

      <Text>Quantité :</Text>
      <TextInput style={STYLES.input} value={quantite} onChangeText={setQuantite} keyboardType="numeric" placeholder="ex: 150" />

      <Text>Commentaire :</Text>
      <TextInput style={STYLES.input} value={commentaire} onChangeText={setCommentaire} multiline placeholder="facultatif" />

      <Text>Type de marée :</Text>
      <TextInput style={STYLES.input} value={maree} onChangeText={setMaree} placeholder="ex: basse, coef 90" />

      <Text>Nom du conchyliculteur :</Text>
      <TextInput style={STYLES.input} value={auteur} onChangeText={setAuteur} placeholder="ex: Jean Martin" />

      <TouchableOpacity style={STYLES.button} onPress={enregistrerAction}>
        <Text style={STYLES.buttonText}> Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

