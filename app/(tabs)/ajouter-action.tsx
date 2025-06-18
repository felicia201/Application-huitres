import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { COLORS, STYLES } from '../theme';

export default function AjouterAction() {
  const router = useRouter();
  const [typeAction, setTypeAction] = useState('');
  const [quantite, setQuantite] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [maree, setMaree] = useState('');
  // const [auteur, setAuteur] = useState('');

  const [auteur, setAuteur] = useState('');
  useEffect(() => {
  const chargerAuteur = async () => {
    const a = await AsyncStorage.getItem('auteur');
    setAuteur(a || 'Anonyme');
  };
  chargerAuteur();
}, []);


  const enregistrerAction = async () => {
    if (!typeAction || !quantite) {
      Alert.alert('Erreur', 'Type et quantité sont obligatoires.');
      return;
    }
 // On crée une nouvelle action sous forme d’objet
    const nouvelleAction = {
      id: Date.now().toString(),
      type: typeAction,
      quantite: parseInt(quantite),
      commentaire,
      maree,
      auteur,
      date: new Date().toISOString(),
    };
 // On récupère la liste existante dans le stockage local
    const data = await AsyncStorage.getItem('actions');
    const liste = data ? JSON.parse(data) : [];
    liste.push(nouvelleAction);
    await AsyncStorage.setItem('actions', JSON.stringify(liste));
    Alert.alert(' Action enregistrée');
    router.push('/liste-actions');
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

