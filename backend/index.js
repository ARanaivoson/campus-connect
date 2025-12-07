/* backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // pour autoriser le frontend à accéder

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend connecté avec succès !' });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Backend démarré sur http://localhost:${port}`);
});
*/