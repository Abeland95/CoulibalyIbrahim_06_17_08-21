const express = require('express');

const router = express.Router();

const authCrtl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création objet---------------------------------------------
router.post('/', auth, multer, authCrtl.createThing);

// Modification objet -----------------------------------------
router.put('/:email', auth, multer, authCrtl.modifyThing);

// Suppression objet ------------------------------------------
router.delete('/:email', auth, authCrtl.deleteThing);

// Obtention d'un objet---------------------------------------
router.get('/:email', auth, authCrtl.getOneThing);

// représentant les objets, obtention de tous objets----------
router.get('/', auth, authCrtl.getAllThings);

module.exports = router;