import AsyncStorage from '@react-native-async-storage/async-storage';

//  IP locale + port 3000 (backend Express)
const API_URL = 'https://backend-huitres.onrender.com';

export const synchroniserActions = async () => {
  try {
    const data = await AsyncStorage.getItem('actions');
    const actions = data ? JSON.parse(data) : [];

    if (actions.length === 0) {
      return { status: 'Aucune action à synchroniser.' };
    }

    const response = await fetch(`${API_URL}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actions),
    });

    if (!response.ok) throw new Error('Erreur côté serveur');

    await AsyncStorage.removeItem('actions');
    return { status: 'Succès', count: actions.length };
  } catch (error) {
    return { status: 'Erreur', message: error.message };
  }
};

export const recupererActionsServeur = async () => {
  try {
    const response = await fetch(`${API_URL}/actions`);
    if (!response.ok) throw new Error('Erreur serveur');

    const data = await response.json();
    return { status: 'OK', actions: data };
  } catch (error) {
    return { status: 'Erreur', message: error.message };
  }
};
