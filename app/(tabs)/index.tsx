import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Accueil() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://127.0.0.1:3000/me');
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
    await fetch('http://127.0.0.1:3000/logout', { method: 'POST' });
    router.replace('/login');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?auto=format&fit=crop&w=1080&q=80',
      }}
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        {user && (
          <View style={styles.profile}>
            <Text style={styles.username}>👋 {user.username}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logout}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.title}>🐚 Application Ostréicole</Text>
        <Text style={styles.subtitle}>Bienvenue dans votre univers marin</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/ajouter-action')}>
          <Text style={styles.buttonText}>➕ Ajouter une action</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/liste-actions')}>
          <Text style={styles.buttonText}>📋 Voir les actions</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 64, 128, 0.45)',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fffbe6',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00a8e8',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 25,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#00a8e8',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fffbe6',
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  profile: {
    position: 'absolute',
    top: 60,
    right: 20,
    alignItems: 'flex-end',
  },
  username: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logout: {
    color: '#ffdb58',
    fontWeight: '600',
    marginTop: 5,
  },
});

