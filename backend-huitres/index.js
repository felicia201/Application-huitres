const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // hasher les mots de passe

const app = express(); // ✅ déclarer AVANT les routes

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connexion à MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'huitres_app',
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return res.status(401).json({ error: 'Mot de passe incorrect' });

    // Ne pas renvoyer le mot de passe
    delete user.password;
    res.json({ message: 'Connexion réussie', user });
  });
});

app.post('/sync', (req, res) => {
  const actions = req.body;
  if (!Array.isArray(actions)) {
    return res.status(400).json({ error: 'Format invalide' });
  }

  const values = actions.map(a => [
    a.type,
    a.quantite,
    a.commentaire,
    a.maree,
    a.auteur,
    new Date(a.date),
  ]);

  const sql = 'INSERT INTO actions (type, quantite, commentaire, maree, auteur, date) VALUES ?';

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur MySQL' });
    res.json({ message: `${result.affectedRows} action(s) enregistrée(s)` });
  });
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(200).json({ message: 'Compte créé avec succès' });
  });
});


app.get('/check-auth', (req, res) => {
  // 🔒 vérifie si l'utilisateur est connecté, par exemple via un cookie, un token, ou une session
  // Ici, on renvoie OK pour l'exemple
  res.status(200).json({ message: 'Connecté' });
});


app.post('/logout', (req, res) => {
  // pour session :
  req.session.destroy(() => {
    res.clearCookie('sessionId');
    res.json({ message: 'Déconnecté' });
  });
});


// Route pour afficher les actions
app.get('/actions', (req, res) => {
  db.query('SELECT * FROM actions ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur MySQL' });
    res.json(results);
  });
});

// Route d'accueil
app.get('/', (req, res) => {
  res.send('✅ API Huitres en ligne');
});

app.listen(PORT, () => {
  console.log(`✅ Serveur actif sur le port ${PORT}`);
});
