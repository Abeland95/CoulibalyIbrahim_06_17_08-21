const express = require('express');

const router = express.Router();

const Sauces = require('../models/sauces')
const authCrtl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// représentant les objets, obtention de tous objets----------
router.get('/', auth, authCrtl.getAllSauces);

// Création objet---------------------------------------------
router.post('/', auth, multer, authCrtl.createSauces);

// Obtention d'un objet---------------------------------------
router.get('/:id', auth, authCrtl.getOneSauces);

// Modification objet -----------------------------------------
router.put('/:id', auth, multer, authCrtl.modifySauces);

// Suppression objet ------------------------------------------
router.delete('/:id', auth, authCrtl.deleteSauces);

// POST pour modifier les likes
router.post('/:id/like', auth, authCrtl.likes )

module.exports = router;