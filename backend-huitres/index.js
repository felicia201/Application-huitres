const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3000;


app.use(cors({
  origin: [
    'http://localhost:8081', 
    'http://192.168.56.1:3000', 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.options('*', cors());

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'huitres_app',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connecté à MySQL');
});



// Inscription
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'Tous les champs sont requis' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    db.query(sql, [username, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY')
          return res.status(400).json({ error: 'Email déjà utilisé' });
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.status(200).json({ message: 'Compte créé avec succès' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(401).json({ error: 'Utilisateur non trouvé' });

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Mot de passe incorrect' });

    delete user.password;
    res.json({ message: 'Connexion réussie', user });
  });
});

// Synchronisation des actions
app.post('/sync', (req, res) => {
  const actions = req.body;
  if (!Array.isArray(actions))
    return res.status(400).json({ error: 'Format invalide' });

  const values = actions.map(a => [
    a.type, a.quantite, a.commentaire, a.maree, a.auteur, new Date(a.date)
  ]);

  const sql = 'INSERT INTO actions (type, quantite, commentaire, maree, auteur, date) VALUES ?';
  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur MySQL' });
    res.json({ message: `${result.affectedRows} action(s) enregistrée(s)` });
  });
});

// Liste des actions
app.get('/actions', (req, res) => {
  db.query('SELECT * FROM actions ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur MySQL' });
    res.json(results);
  });
});

// Test de connexion
app.get('/', (req, res) => {
  res.send(' API Huitres opérationnelle');
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(` http://192.168.1.25:${PORT}`);
});
