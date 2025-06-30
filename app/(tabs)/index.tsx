// import React ,{ useEffect}from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet,  } from 'react-native';
// import { useRouter } from 'expo-router';
// import { COLORS } from '../theme';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Accueil() {
//   const router = useRouter();

  
//  useEffect(() => {
//     const checkLogin = async () => {
//       const auteur = await AsyncStorage.getItem('auteur');
//       if (!auteur) {
//         router.replace('/login'); // Si pas connecté, redirige vers login
//       }
//     };
//     checkLogin();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../utils/logo.png')} // ← ton logo ici
//         style={styles.logo}
//       />
//       <Text style={styles.title}>Application Ostréicole</Text>
//       <Text style={styles.subtitle}>Gérez vos semis et récoltes en mer</Text>

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/ajouter-action')}>
//         <Text style={styles.buttonText}>➕ Nouvelle action</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/liste-actions')}>
//         <Text style={styles.buttonText}>📋 Voir les actions</Text>
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
//     width: 120,
//     height: 120,
//     marginBottom: 20,
//     borderRadius: 60,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: COLORS.text,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: COLORS.text,
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../theme';
// import { useState } from 'react';

export default function Accueil() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include', // ⬅️ IMPORTANT pour que le cookie de session soit envoyé
        });
        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
        } else {
          router.replace('/login');
        }
      } catch (err) {
        console.error(err);
        router.replace('/login');
      }
    };

    fetchUser();
  }, []);

  




  const handleLogout = async () => {
    await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.profile}>
          {/* <Image source={require('../utils/profile.png')} style={styles.avatar} /> */}
          <Text style={styles.username}>{user.username}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.title}>🐚 Application Ostréicole</Text>
      <Text style={styles.subtitle}>Bienvenue sur l'application !</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ajouter-action')}>
        <Text style={styles.buttonText}>➕ Ajouter une action</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/liste-actions')}>
        <Text style={styles.buttonText}>📋 Voir les actions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
