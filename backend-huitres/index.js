const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let actions = [];

app.post('/sync', (req, res) => {
  const nouvellesActions = req.body;
  if (!Array.isArray(nouvellesActions)) {
    return res.status(400).json({ error: 'Format invalide' });
  }
  actions.push(...nouvellesActions);
  console.log('📥 Reçu :', nouvellesActions.length);
  res.status(200).json({ message: 'Actions enregistrées' });
});

app.get('/actions', (req, res) => {
  res.json(actions);
});

app.listen(PORT, () => {
  console.log(`✅ Serveur actif sur le port ${PORT}`);
});
