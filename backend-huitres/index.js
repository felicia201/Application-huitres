

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔹 Connexion à MySQL locale
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'huitres_app',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion MySQL:', err.message);
  } else {
    console.log(' Connecté à MySQL');
  }
});

//  Route SIGNUP
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email déjà utilisé' });
        }
        console.error('Erreur MySQL:', err.message);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json({ message: 'Compte créé avec succès' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

//  Route LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Tous les champs sont requis' });

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });

    if (results.length === 0)
      return res.status(401).json({ error: 'Utilisateur non trouvé' });

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(401).json({ error: 'Mot de passe incorrect' });

    delete user.password;
    res.json({ message: 'Connexion réussie', user });
  });
});

//  Route test
app.get('/', (req, res) => {
  res.send(' API Huitres opérationnelle');
});

app.listen(PORT, () => {
  console.log(` Serveur lancé sur le port ${PORT}`);
});
