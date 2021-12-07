const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces');
const authRoutes = require('./routes/auth');
const path = require('path');

// Installation mongoose-----------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin0@cluster0.8p3gl.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// OC------------------------------------------------------------------------
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Transforme json bodyparser en objet javascript
app.use(bodyParser.json())

// Middleware pour répondre aux requêtes envoyé aux images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('api/auth', authRoutes);

app.use('api/sauces', saucesRoutes);






module.exports = app;