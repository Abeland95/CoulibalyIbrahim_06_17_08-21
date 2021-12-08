const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, //on ajoute l attribut unique pour qu il ne puisse enregistrer qu un compte par mail
  password: { type: String, required: true } 
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);