const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// FOnction inscription utilisateur----------------------------------------
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Fonction pour connecter utilisateur existant------------------------------
exports.login = (req, res, next) => {
  // Chercher l'utilisateur
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
    //user trouve donc compare hash du bdd au hash genere par la saisie du log
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
    //Si comparaison mauvaise 
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
    // Comparaison bonne mdp valide
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
    // Temps validation du token
                { expiresIn: '24h' }
              ) 
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};