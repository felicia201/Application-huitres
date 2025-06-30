// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Image,
// } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import { COLORS, STYLES } from '../theme';

// export default function Login() {
//   const [pseudo, setPseudo] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     if (!pseudo.trim()) {
//       Alert.alert('Erreur', 'Veuillez entrer votre prénom.');
//       return;
//     }

//     await AsyncStorage.setItem('auteur', pseudo.trim());
//     router.replace('/'); 
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../utils/logo.png')}
//         style={styles.logo}
//       />

//       <Text style={styles.title}>Bienvenue 👋</Text>
//       <Text style={styles.subtitle}>Veuillez vous identifier</Text>

//       {/* <Text style={styles.label}>Prénom :</Text> */}
//       <TextInput
//         style={STYLES.input}
//         placeholder=" Clara"
//         value={pseudo}
//         onChangeText={setPseudo}
//       />

//       <TouchableOpacity style={STYLES.button} onPress={handleLogin}>
//         <Text style={STYLES.buttonText}> Entrer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 25,
//     borderRadius: 50,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: COLORS.text,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: COLORS.text,
//     marginBottom: 25,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     color: COLORS.text,
//     alignSelf: 'flex-start',
//     marginBottom: 5,
//     marginLeft: '10%',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Erreur', data.error || 'Connexion échouée');
        return;
      }

      Alert.alert('Succès', 'Connexion réussie 🎉');
      router.replace('/');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se connecter');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../utils/login-bg.png')} style={styles.backgroundImage} /> */}
      <View style={styles.overlay}>
        <Text style={styles.greeting}>Bienvenue 👋</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.linkText}>Pas encore de compte ? <Text style={styles.link}>S’inscrire</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  link: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});
